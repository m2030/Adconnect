// src/utils/companyEmail.ts
export const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com","googlemail.com","hotmail.com","outlook.com","live.com",
  "yahoo.com","yahoo.co.uk","aol.com","icloud.com","protonmail.com",
  "pm.me","mail.com","gmx.com","gmx.de","yandex.com","yandex.ru",
  "zoho.com","fastmail.com","hey.com"
]);

export function validateCompanyEmail(email: string): string | null {
  const e = email.trim().toLowerCase();
  const ok = /^[a-z0-9._%+-]+@([a-z0-9-]+\.)+[a-z]{2,}$/.test(e);
  if (!ok) return "Enter a valid email address.";
  const domain = e.split("@")[1];
  if (FREE_EMAIL_DOMAINS.has(domain)) {
    return "Please use your company email (no Gmail/Hotmail/Yahoo/etc.).";
  }
  return null;
}
