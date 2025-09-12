import time, requests, jwt, functools, threading, os
from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions

class _JWKSCache:
    _cache = None
    _exp = 0
    _lock = threading.Lock()

    @classmethod
    def get(cls, url):
        with cls._lock:
            now = time.time()
            if cls._cache and now < cls._exp:
                return cls._cache
            resp = requests.get(url, timeout=5)
            resp.raise_for_status()
            data = resp.json()
            # cache for 10 minutes
            cls._cache = {k["kid"]: k for k in data.get("keys", [])}
            cls._exp = now + 600
            return cls._cache

def _get_public_key(token_header, jwks_url):
    kid = token_header.get("kid")
    jwks = _JWKSCache.get(jwks_url)
    key = jwks.get(kid)
    if not key:
        # refresh once
        _JWKSCache._exp = 0
        jwks = _JWKSCache.get(jwks_url)
        key = jwks.get(kid)
    if not key:
        raise exceptions.AuthenticationFailed("Unknown key id")
    return jwt.algorithms.RSAAlgorithm.from_jwk(key)

class KeycloakJWTAuthentication(BaseAuthentication):
    keyword = "Bearer"

    def authenticate(self, request):
        auth = request.headers.get("Authorization", "")
        if not auth.lower().startswith("bearer "):
            return None
        token = auth.split(" ", 1)[1]
        try:
            unverified_header = jwt.get_unverified_header(token)
            public_key = _get_public_key(unverified_header, settings.OIDC_JWKS_URL)
            claims = jwt.decode(
                token,
                key=public_key,
                algorithms=[unverified_header.get("alg","RS256")],
                audience=settings.OIDC_AUDIENCE,
                options={"verify_exp": True, "verify_aud": True},
                issuer=settings.OIDC_ISSUER,
            )
        except Exception as e:
            raise exceptions.AuthenticationFailed(str(e))

        # Optionally map to a Django User; for demo, use a lightweight object
        user = type("User", (), {"is_authenticated": True, "username": claims.get("preferred_username","")})()
        request.token_claims = claims
        return (user, None)
