import re
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from .keycloak_admin import KCAdmin

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

def _allowed(email, allowed_domains):
    if not EMAIL_RE.match(email or ""):
        return False
    domain = email.split("@")[-1].lower()
    return any(domain == d or domain.endswith("." + d) for d in allowed_domains)

def _payload_ok(data):
    return bool(data.get("email"))

@api_view(["POST"])
@permission_classes([AllowAny])
def register_sponsor(request):
    data = request.data or {}
    if not _payload_ok(data):
        return Response({"detail": "email is required"}, status=400)
    email = data["email"].strip().lower()
    if not _allowed(email, settings.SPONSOR_ALLOWED_DOMAINS):
        return Response({"detail": "Email domain not allowed for sponsors."}, status=403)
    uid, created = KCAdmin.create_user(email, data.get("first_name",""), data.get("last_name",""))
    if not uid:
        return Response({"detail": "Unable to create or find user"}, status=500)
    KCAdmin.assign_realm_role(uid, "sponsor")
    try:
        KCAdmin.send_verify_and_setpwd_email(uid, redirect_uri=data.get("redirect_uri","http://localhost:5173/"))
    except Exception:
        # ok in dev without SMTP; user can still login after admin sets password
        pass
    return Response({"ok": True, "created": created}, status=201 if created else 200)

@api_view(["POST"])
@permission_classes([AllowAny])
def register_advertiser(request):
    data = request.data or {}
    if not _payload_ok(data):
        return Response({"detail": "email is required"}, status=400)
    email = data["email"].strip().lower()
    if not _allowed(email, settings.ADVERTISER_ALLOWED_DOMAINS):
        return Response({"detail": "Email domain not allowed for advertisers."}, status=403)
    uid, created = KCAdmin.create_user(email, data.get("first_name",""), data.get("last_name",""))
    if not uid:
        return Response({"detail": "Unable to create or find user"}, status=500)
    KCAdmin.assign_realm_role(uid, "advertiser")
    try:
        KCAdmin.send_verify_and_setpwd_email(uid, redirect_uri=data.get("redirect_uri","http://localhost:5173/"))
    except Exception:
        pass
    return Response({"ok": True, "created": created}, status=201 if created else 200)
