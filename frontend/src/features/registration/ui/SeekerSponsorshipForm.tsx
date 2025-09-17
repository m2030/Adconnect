import { useState, startTransition, FormEvent } from "react";
import { useTranslation } from "react-i18next";

export default function SeekerSponsorshipForm() {
  const { t, i18n } = useTranslation(["registration", "common"]);
  const [companyName, setCompanyName] = useState("");
  const [activity, setActivity] = useState("");
  const [hasPrev, setHasPrev] = useState<null | boolean>(null);
  const [examples, setExamples] = useState("");
  const [docs, setDocs] = useState<FileList | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!companyName.trim()) err.companyName = t("registration:errors.required");
    if (!activity.trim()) err.activity = t("registration:errors.required");
    if (hasPrev === null) err.hasPrev = t("registration:errors.required");
    if (hasPrev === true && !examples.trim()) err.examples = t("registration:errors.required");

    setErrors(err);
    if (Object.keys(err).length) return;

    // TODO: Send to API
    console.log({
      companyName,
      activity,
      hasPrev,
      examples: hasPrev ? examples : undefined,
      docsCount: docs?.length ?? 0,
    });
    alert(t("registration:sponsorship.flash.saved"));
  };

  const yesNo = [
    { key: "yes", value: true },
    { key: "no", value: false },
  ] as const;

  return (
    <form onSubmit={onSubmit} className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-xl font-semibold">
          {t("registration:sponsorship.title")}
        </h2>

        <p className="opacity-70 mb-4">
          {t("registration:sponsorship.objective")}
        </p>

        {/* Company Name */}
        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">{t("registration:sponsorship.fields.companyName")}</span>
          </label>
          <input
            className={`input input-bordered ${errors.companyName ? "input-error" : ""}`}
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          {errors.companyName && <span className="text-error text-sm mt-1">{errors.companyName}</span>}
        </div>

        {/* Activity */}
        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">{t("registration:sponsorship.fields.activity")}</span>
          </label>
          <input
            className={`input input-bordered ${errors.activity ? "input-error" : ""}`}
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
          {errors.activity && <span className="text-error text-sm mt-1">{errors.activity}</span>}
        </div>

        {/* Government Docs & Permits */}
        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">{t("registration:sponsorship.fields.documents")}</span>
          </label>
          <input
            type="file"
            multiple
            accept=".pdf,image/*"
            className="file-input file-input-bordered"
            onChange={(e) => setDocs(e.target.files)}
          />
          <span className="text-xs opacity-60 mt-1">
            {t("registration:sponsorship.hint.documents")}
          </span>
        </div>

        {/* Previously secured sponsorships? */}
        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">{t("registration:sponsorship.fields.hasPrevious")}</span>
          </label>
          <div className="join">
            {yesNo.map(({ key, value }) => (
              <button
                key={key}
                type="button"
                className={`btn join-item ${hasPrev === value ? "btn-primary" : ""}`}
                onClick={() => setHasPrev(value)}
              >
                {t(`registration:sponsorship.options.${key}`)}
              </button>
            ))}
          </div>
          {errors.hasPrev && <span className="text-error text-sm mt-1">{errors.hasPrev}</span>}
        </div>

        {/* Examples (conditional) */}
        {hasPrev === true && (
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">{t("registration:sponsorship.fields.examples")}</span>
            </label>
            <textarea
              className={`textarea textarea-bordered min-h-[6rem] ${errors.examples ? "textarea-error" : ""}`}
              value={examples}
              onChange={(e) => setExamples(e.target.value)}
              placeholder={t("registration:sponsorship.hint.examples") || ""}
            />
            {errors.examples && <span className="text-error text-sm mt-1">{errors.examples}</span>}
          </div>
        )}

        <div className="mt-4 flex gap-2 justify-end">
          <button type="submit" className="btn btn-primary">
            {t("registration:sponsorship.actions.submit")}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => startTransition(() => i18n.changeLanguage(i18n.language.startsWith("ar") ? "en" : "ar"))}
          >
            {t("common:back")}
          </button>
        </div>
      </div>
    </form>
  );
}
