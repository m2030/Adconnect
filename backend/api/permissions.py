from django.conf import settings
from rest_framework.permissions import BasePermission, SAFE_METHODS

def _all_roles(claims):
    realm = claims.get("realm_access", {}).get("roles", [])
    client = (
        claims.get("resource_access", {})
        .get(settings.OIDC_AUDIENCE, {})
        .get("roles", [])
    )
    return set(realm) | set(client)

class HasRole(BasePermission):
    required_role = None

    def has_permission(self, request, view):
        claims = getattr(request, "token_claims", None) or {}
        return bool(claims) and self.required_role in _all_roles(claims)

class IsSponsor(HasRole):
    required_role = "sponsor"

class IsAdvertiser(HasRole):
    required_role = "advertiser"

class IsVerified(HasRole):
    required_role = "verified_user"

class ReadOnlyUnlessVerified(BasePermission):
    """
    - Allows GET/HEAD/OPTIONS for any authenticated user (browsing)
    - Blocks POST/PUT/PATCH/DELETE unless user has realm role: verified_user
    """
    message = "Account pending admin verification."

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        claims = getattr(request, "token_claims", None) or {}
        return "verified_user" in _all_roles(claims)
