import { useTranslation } from "react-i18next";

export default function SeekerFormPage() {
  const { t } = useTranslation();
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">{t("register.seeker.title", "Service Seeker - Registration")}</h1>
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <form className="grid gap-4">
            <label className="form-control">
              <span className="label-text">{t("field.companyName", "Company name")}</span>
              <input className="input input-bordered" name="companyName" />
            </label>
            <label className="form-control">
              <span className="label-text">{t("field.activity", "Activity")}</span>
              <input className="input input-bordered" name="activity" />
            </label>
            <button type="button" className="btn btn-primary">
              {t("action.continue", "Continue")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
