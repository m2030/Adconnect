import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function RegistrationStart() {
  const nav = useNavigate();
  const { t } = useTranslation("translation");

  return (
    <div style={{ maxWidth: 720, margin: "60px auto", padding: 20 }}>
      <h1>{t("register.start.title")}</h1>

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button onClick={() => nav("/register/provider")}>
          {t("register.start.provider")}
        </button>

        <button onClick={() => nav("/register/seeker")}>
          {t("register.start.seeker")}
        </button>
      </div>
    </div>
  );
}