import time, requests
from django.conf import settings

class KCAdmin:
    _cached_token = None
    _exp = 0

    @classmethod
    def _token(cls):
        now = time.time()
        if cls._cached_token and now < cls._exp - 30:
            return cls._cached_token
        data = {
            "grant_type": "password",
            "client_id": "admin-cli",
            "username": settings.KEYCLOAK_ADMIN_USER,
            "password": settings.KEYCLOAK_ADMIN_PASSWORD,
        }
        url = f"{settings.KEYCLOAK_BASE_URL}/realms/master/protocol/openid-connect/token"
        r = requests.post(url, data=data, timeout=10)
        r.raise_for_status()
        j = r.json()
        cls._cached_token = j["access_token"]
        cls._exp = now + int(j.get("expires_in", 60))
        return cls._cached_token

    @classmethod
    def _hdr(cls):
        return {"Authorization": f"Bearer {cls._token()}", "Content-Type": "application/json"}

    @classmethod
    def create_user(cls, email, first_name, last_name):
        url = f"{settings.KEYCLOAK_BASE_URL}/admin/realms/{settings.KEYCLOAK_REALM}/users"
        payload = {
            "username": email,
            "email": email,
            "firstName": first_name or "",
            "lastName": last_name or "",
            "enabled": True,
            "emailVerified": False,
        }
        r = requests.post(url, headers=cls._hdr(), json=payload, timeout=10)
        if r.status_code == 409:
            # user exists: fetch id
            uid = cls.find_user_id(email)
            return uid, False
        r.raise_for_status()
        # Location header ends with /{id}
        uid = r.headers.get("Location", "").rstrip("/").split("/")[-1]
        return uid, True

    @classmethod
    def find_user_id(cls, email):
        url = f"{settings.KEYCLOAK_BASE_URL}/admin/realms/{settings.KEYCLOAK_REALM}/users"
        r = requests.get(url, headers=cls._hdr(), params={"email": email, "exact": "true"}, timeout=10)
        r.raise_for_status()
        arr = r.json()
        return arr[0]["id"] if arr else None

    @classmethod
    def assign_realm_role(cls, user_id, role_name):
        # fetch role rep with id
        role_url = f"{settings.KEYCLOAK_BASE_URL}/admin/realms/{settings.KEYCLOAK_REALM}/roles/{role_name}"
        rr = requests.get(role_url, headers=cls._hdr(), timeout=10)
        rr.raise_for_status()
        role = rr.json()
        url = f"{settings.KEYCLOAK_BASE_URL}/admin/realms/{settings.KEYCLOAK_REALM}/users/{user_id}/role-mappings/realm"
        r = requests.post(url, headers=cls._hdr(), json=[{"id": role["id"], "name": role["name"]}], timeout=10)
        # 204 on success; 409 if already assigned
        if r.status_code not in (204, 409):
            r.raise_for_status()

    @classmethod
    def send_verify_and_setpwd_email(cls, user_id, redirect_uri="http://localhost:5173/"):
        url = (f"{settings.KEYCLOAK_BASE_URL}/admin/realms/{settings.KEYCLOAK_REALM}"
               f"/users/{user_id}/execute-actions-email")
        params = {"client_id": "demo-spa", "redirect_uri": redirect_uri}
        r = requests.put(url, headers=cls._hdr(), params=params,
                         json=["VERIFY_EMAIL", "UPDATE_PASSWORD"], timeout=10)
        # 204 on success
        if r.status_code != 204:
            r.raise_for_status()
