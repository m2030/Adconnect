import { useTranslation } from "react-i18next";

export default function InfluencerFormPage() {
  const { t } = useTranslation();
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">{t("register.influencer.title", "Influencer - Registration")}</h1>
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <form className="grid gap-4">
            <label className="form-control">
              <span className="label-text">{t("field.fullName", "Full name")}</span>
              <input className="input input-bordered" name="fullName" />
            </label>
            <label className="form-control">
              <span className="label-text">{t("field.platforms", "Platforms + followers")}</span>
              <input className="input input-bordered" name="platforms" placeholder="e.g. Instagram 50k, TikTok 120k" />
            </label>
            <button type="button" className="btn btn-primary">
              {t("action.submit", "Submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
