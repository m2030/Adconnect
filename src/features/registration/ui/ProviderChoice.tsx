import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ProviderChoice() {
  const nav = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        {t("register.provider.title", "You are a Service Provider")}
      </h1>
      <p className="mb-6">
        {t("register.provider.subtitle", "Select your category")}
      </p>

      <div className="grid gap-3">
        <button className="btn" onClick={() => nav("/register/advertiser")}>
          {t("register.provider.agency", "Marketing & Advertising Company")}
        </button>

        <button className="btn" onClick={() => nav("/register/sponsor")}>
          {t("register.provider.sponsorshipEntity", "Sponsorship Entity (events, projects, clubs...)")}
        </button>

        <button className="btn btn-primary" onClick={() => nav("/register/influencer")}>
          {t("register.provider.influencer", "Influencer / Celebrity")}
        </button>
      </div>
    </div>
  );
}
