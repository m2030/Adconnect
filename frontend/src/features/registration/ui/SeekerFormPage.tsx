import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function SeekerFormPage() {
  const { t, i18n } = useTranslation("registration");
  const nav = useNavigate();

  return (
    <div className="max-w-2xl mx-auto card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-2xl font-semibold">{t("seeker.title")}</h2>
        <p className="opacity-70 mb-4">{t("seeker.subtitle")}</p>

        <div className="form-control mb-3">
          <label className="label"><span className="label-text">{t("seeker.fields.companyName")}</span></label>
          <input className="input input-bordered" />
        </div>

        <div className="form-control mb-3">
          <label className="label"><span className="label-text">{t("seeker.fields.activity")}</span></label>
          <input className="input input-bordered" />
        </div>

        <div className="form-control mb-3">
          <label className="label"><span className="label-text">{t("seeker.fields.permits")}</span></label>
          <input type="file" className="file-input file-input-bordered" multiple />
        </div>

        <div className="form-control mb-3">
          <label className="label cursor-pointer justify-start gap-3">
            <input type="checkbox" className="checkbox" />
            <span className="label-text">{t("seeker.fields.hasInternalMarketing")}</span>
          </label>
        </div>

        <div className="form-control mb-3">
          <label className="label"><span className="label-text">{t("seeker.fields.field")}</span></label>
          <input className="input input-bordered" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="label cursor-pointer justify-start gap-3">
            <input type="checkbox" className="checkbox" />
            <span className="label-text">{t("seeker.fields.wantSponsorship")}</span>
          </label>
          <label className="label cursor-pointer justify-start gap-3">
            <input type="checkbox" className="checkbox" />
            <span className="label-text">{t("seeker.fields.wantMarketing")}</span>
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <div className="form-control">
            <label className="label"><span className="label-text">{t("seeker.fields.annualBudgetSponsorship")}</span></label>
            <input type="number" className="input input-bordered" min={0} dir="ltr" />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">{t("seeker.fields.annualBudgetMarketing")}</span></label>
            <input type="number" className="input input-bordered" min={0} dir="ltr" />
          </div>
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <button className="btn btn-ghost" onClick={() => nav(-1)}>
            {t("actions.back")}
          </button>
          <button className="btn btn-primary">
            {t("actions.submit")}
          </button>
        </div>
      </div>
    </div>
  );
}
