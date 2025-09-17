import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function ProviderSponsorshipEntityFormPage() {
  const { t } = useTranslation("registration"); // <-- important
  const nav = useNavigate();

  return (
    <div className="max-w-2xl mx-auto card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-2xl font-semibold">{t("provider.sponsorshipEntity.title")}</h2>
        <p className="opacity-70 mb-4">{t("provider.sponsorshipEntity.subtitle")}</p>

        <div className="form-control mb-3">
          <label className="label"><span className="label-text">{t("provider.sponsorshipEntity.fields.companyName")}</span></label>
          <input className="input input-bordered" />
        </div>

        <div className="form-control mb-3">
          <label className="label"><span className="label-text">{t("provider.sponsorshipEntity.fields.activity")}</span></label>
          <input className="input input-bordered" />
        </div>

        <div className="form-control mb-3">
          <label className="label"><span className="label-text">{t("provider.sponsorshipEntity.fields.permits")}</span></label>
          <input type="file" className="file-input file-input-bordered" multiple />
        </div>

        <div className="form-control mb-3">
          <label className="label cursor-pointer justify-start gap-3">
            <input type="checkbox" className="checkbox" />
            <span className="label-text">{t("provider.sponsorshipEntity.fields.hasPreviousSponsorships")}</span>
          </label>
        </div>

        <div className="form-control mb-3">
          <label className="label"><span className="label-text">{t("provider.sponsorshipEntity.fields.previousExamples")}</span></label>
          <textarea className="textarea textarea-bordered" rows={3} />
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <button className="btn btn-ghost" onClick={() => nav(-1)}>{t("actions.back")}</button>
          <button className="btn btn-primary">{t("actions.submit")}</button>
        </div>
      </div>
    </div>
  );
}
