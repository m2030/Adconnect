import os, jwt, requests
from django.conf import settings

def test_openapi_schema(client):
    r = client.get("/api/schema/")
    assert r.status_code == 200
