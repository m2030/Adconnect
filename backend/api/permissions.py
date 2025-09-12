from django.conf import settings
from rest_framework.permissions import BasePermission

def _all_roles(claims):
    realm = claims.get("realm_access", {}).get("roles", [])
    client = claims.get("resource_access", {}).get(settings.OIDC_AUDIENCE, {}).get("roles", [])
    return set(realm) | set(client)

class HasRole(BasePermission):
    required_role = None
    def has_permission(self, request, view):
        claims = getattr(request, "token_claims", None)
        return bool(claims) and self.required_role in _all_roles(claims)

class IsSponsor(HasRole):   required_role = "sponsor"
class IsAdvertiser(HasRole): required_role = "advertiser"