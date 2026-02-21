# backend/api/views.py
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    claims = getattr(request, "token_claims", {}) or {}
    roles = (claims.get("realm_access") or {}).get("roles") or []
    return Response({
        "roles": roles,
        "verified": "verified_user" in roles,
    })