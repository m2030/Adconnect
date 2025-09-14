import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function RegistrationStart() {
  const nav = useNavigate();
  const { t } = useTranslation("translation"); // or ["translation","common"]

  return (
    <div className="max-w-xl mx-auto card bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="card-title text-2xl mb-2">{t("register.start.title")}</h1>
        <div className="grid gap-3 mt-2">
          <button className="btn btn-primary" onClick={() => nav("/register/provider")}>
            {t("register.start.provider")}
          </button>
          <button className="btn" onClick={() => nav("/register/seeker")}>
            {t("register.start.seeker")}
          </button>
        </div>
      </div>
    </div>
  );
}