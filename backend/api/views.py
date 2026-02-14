from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .permissions import ReadOnlyUnlessVerified
from .permissions import IsSponsor, IsAdvertiser
from .permissions import IsVerified  # optional if you want to use it directly
from .permissions import _all_roles  # or copy the logic locally

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    claims = getattr(request, "token_claims", {}) or {}
    username = claims.get("preferred_username") or getattr(request.user, "username", None)

    roles = sorted(_all_roles(claims))
    verified = "verified_user" in set(roles)

    return Response({
        "user": username,
        "roles": roles,
        "verified": verified,
    })
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated, IsSponsor, ReadOnlyUnlessVerified])
def sponsor_home(request):
    if request.method == "GET":
        return Response({"ok": True, "role": "sponsor", "mode": "browse"})

    # POST = action (blocked unless verified_user)
    return Response({"ok": True, "message": "Action executed"})