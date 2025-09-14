import { useTranslation } from "react-i18next";

export default function SeekerFormPage() {
  const { t } = useTranslation("registration"); // <- single ns

  return (
    <div className="max-w-xl mx-auto card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-xl font-semibold mb-4">{t("seeker.title")}</h2>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">{t("company.name")}</span>
          </label>
          <input className="input input-bordered" />
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">{t("activity")}</span>
          </label>
          <input className="input input-bordered" />
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">{t("permits")}</span>
          </label>
          <input type="file" className="file-input file-input-bordered" />
        </div>

        <button className="btn btn-primary">{t("submit")}</button>
      </div>
    </div>
  );
}
