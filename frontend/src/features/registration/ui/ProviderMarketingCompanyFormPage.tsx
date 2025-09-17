import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function ProviderMarketingCompanyFormPage() {
  const { t } = useTranslation("registration");
  const nav = useNavigate();

  const services = [
    "content",
    "ads",
    "influencerMgmt",
    "social",
    "seo",
    "events",
    "branding",
    "analytics"
  ] as const;

  const sizes = ["solo", "small", "medium", "large", "enterprise"] as const;

  return (
    <div className="max-w-2xl mx-auto card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-2xl font-semibold">{t("provider.marketingCompany.title")}</h2>
        <p className="opacity-70 mb-4">{t("provider.marketingCompany.subtitle")}</p>

        <div className="form-control mb-3">
          <label className="label"><span className="label-text">{t("provider.marketingCompany.fields.companyName")}</span></label>
          <input className="input input-bordered" />
        </div>

        <div className="form-control mb-3">
          <label className="label"><span className="label-text">{t("provider.marketingCompany.fields.activity")}</span></label>
          <input className="input input-bordered" />
        </div>

        <div className="form-control mb-3">
          <label className="label"><span className="label-text">{t("provider.marketingCompany.fields.permits")}</span></label>
          <input type="file" className="file-input file-input-bordered" multiple />
        </div>

        <div className="mb-3">
          <div className="label"><span className="label-text">{t("provider.marketingCompany.fields.servicesOffered")}</span></div>
          <div className="grid md:grid-cols-2 gap-x-4">
            {services.map(key => (
              <label key={key} className="label cursor-pointer justify-start gap-3">
                <input type="checkbox" className="checkbox" />
                <span className="label-text">{t(`provider.marketingCompany.serviceTypes.${key}`)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-control mb-3">
          <label className="label"><span className="label-text">{t("provider.marketingCompany.fields.exampleWork")}</span></label>
          <input type="file" className="file-input file-input-bordered" accept="application/pdf" multiple />
        </div>

        <div className="form-control mb-3">
          <label className="label"><span className="label-text">{t("provider.marketingCompany.fields.audienceExperience")}</span></label>
          <textarea className="textarea textarea-bordered" rows={3} />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text">{t("provider.marketingCompany.fields.companySize")}</span></label>
            <select className="select select-bordered">
              {sizes.map(s => (
                <option key={s} value={s}>
                  {t(`provider.marketingCompany.companySizeOptions.${s}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">{t("provider.marketingCompany.fields.teamMembers")}</span></label>
            <input type="number" className="input input-bordered" min={1} dir="ltr" />
          </div>
        </div>

        <div className="form-control mt-3">
          <label className="label cursor-pointer justify-start gap-3">
            <input type="checkbox" className="checkbox" />
            <span className="label-text">{t("provider.marketingCompany.fields.hasAffiliatedInfluencers")}</span>
          </label>
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <button className="btn btn-ghost" onClick={() => nav(-1)}>{t("actions.back")}</button>
          <button className="btn btn-primary">{t("actions.submit")}</button>
        </div>
      </div>
    </div>
  );
}
