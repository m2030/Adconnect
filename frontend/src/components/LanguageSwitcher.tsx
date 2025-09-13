// frontend/src/components/LanguageSwitcher.tsx
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language?.toLowerCase().startsWith("ar") ? "ar" : "en";

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-sm">
        {current === "ar" ? "العربية" : "English"}
      </label>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36">
        <li><a onClick={() => i18n.changeLanguage("en")}>English</a></li>
        <li><a onClick={() => i18n.changeLanguage("ar")}>العربية</a></li>
      </ul>
    </div>
  );
}
