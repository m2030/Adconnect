# app/users/serializers.py
from django.core.validators import validate_email as django_validate_email
from django.core.exceptions import ValidationError
from rest_framework import serializers

FREE_EMAIL_DOMAINS = {
    "gmail.com", "googlemail.com", "hotmail.com", "outlook.com", "live.com",
    "yahoo.com", "yahoo.co.uk", "aol.com", "icloud.com", "protonmail.com",
    "pm.me", "mail.com", "gmx.com", "gmx.de", "yandex.com", "yandex.ru",
    "zoho.com", "fastmail.com", "hey.com"
}

class CompanySignupSerializer(serializers.Serializer):
    email = serializers.EmailField()
    # ... other fields ...

    def validate_email(self, value):
        email = value.strip().lower()
        try:
            django_validate_email(email)
        except ValidationError:
            raise serializers.ValidationError("Enter a valid email address.")
        domain = email.split("@", 1)[1]
        if domain in FREE_EMAIL_DOMAINS:
            raise serializers.ValidationError(
                "Please use your company email (no Gmail/Hotmail/Yahoo/etc.)."
            )
        return email
