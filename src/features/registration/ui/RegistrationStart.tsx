import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function RegistrationStart() {
  const nav = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">{t("register.start.title", "Open a new account")}</h1>
      <p className="mb-6">{t("register.start.subtitle", "Choose your path")}</p>
      <div className="grid gap-3">
        <button className="btn btn-primary" onClick={() => nav("/register/provider")}>
          {t("register.start.provider", "Service Provider")}
        </button>
        <button className="btn" onClick={() => nav("/register/seeker")}>
          {t("register.start.seeker", "Service Seeker")}
        </button>
      </div>
    </div>
  );
}
