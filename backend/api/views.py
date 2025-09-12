from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .permissions import IsSponsor, IsAdvertiser

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    claims = getattr(request, "token_claims", {})
    username = claims.get("preferred_username") or getattr(request.user, "username", None)
    roles = set(claims.get("realm_access", {}).get("roles", []))
    aud = request.settings.OIDC_AUDIENCE if hasattr(request, "settings") else None
    roles |= set(claims.get("resource_access", {}).get(aud or "", {}).get("roles", []))
    return Response({"user": username, "roles": sorted(roles), "claims": claims})

@api_view(["GET"])
@permission_classes([IsAuthenticated, IsSponsor])
def sponsor_home(request):
    return Response({"ok": True, "role": "sponsor"})

@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAdvertiser])
def advertiser_home(request):
    return Response({"ok": True, "role": "advertiser"})