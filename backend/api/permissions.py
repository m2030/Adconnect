# backend/api/permissions.py

from django.conf import settings
from rest_framework.permissions import BasePermission, SAFE_METHODS


def _all_roles(claims: dict) -> set[str]:
    """
    Collect roles from:
      - realm roles: claims["realm_access"]["roles"]
      - client roles: claims["resource_access"][OIDC_AUDIENCE]["roles"]
    """
    realm_roles = (claims.get("realm_access") or {}).get("roles") or []

    client_roles = (
        (claims.get("resource_access") or {})
        .get(getattr(settings, "OIDC_AUDIENCE", ""), {})
        .get("roles")
        or []
    )

    return set(realm_roles) | set(client_roles)


class HasRole(BasePermission):
    """
    Base permission: requires a single role (realm or client role).
    Subclasses set `required_role`.
    """
    required_role: str | None = None

    def has_permission(self, request, view) -> bool:
        if not self.required_role:
            return False

        claims = getattr(request, "token_claims", None) or {}
        roles = _all_roles(claims)
        return self.required_role in roles


class IsSponsor(HasRole):
    required_role = "sponsor"


class IsAdvertiser(HasRole):
    required_role = "advertiser"


class IsVerified(HasRole):
    required_role = "verified_user"


class ReadOnlyUnlessVerified(BasePermission):
    """
    Allows read-only (GET/HEAD/OPTIONS) for authenticated users.
    Blocks write methods (POST/PUT/PATCH/DELETE) unless user has verified_user role.
    """
    message = "Account pending admin verification."

    def has_permission(self, request, view) -> bool:
        if request.method in SAFE_METHODS:
            return True

        claims = getattr(request, "token_claims", None) or {}
        return "verified_user" in _all_roles(claims)