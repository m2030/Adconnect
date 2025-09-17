import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function ProviderInfluencerFormPage() {
  const { t } = useTranslation("registration");
  const nav = useNavigate();

  const platforms: Array<keyof typeof platformKeys> = ["instagram", "tiktok", "x", "youtube", "snapchat"];
  const platformKeys = {
    instagram: "provider.influencer.platformOptions.instagram",
    tiktok: "provider.influencer.platformOptions.tiktok",
    x: "provider.influencer.platformOptions.x",
    youtube: "provider.influencer.platformOptions.youtube",
    snapchat: "provider.influencer.platformOptions.snapchat"
  } as const;

  return (
    <div className="max-w-2xl mx-auto card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-2xl font-semibold">{t("provider.influencer.title")}</h2>
        <p className="opacity-70 mb-4">{t("provider.influencer.subtitle")}</p>

        <div className="form-control mb-3">
          <label className="label"><span className="label-text">{t("provider.influencer.fields.fullName")}</span></label>
          <input className="input input-bordered" />
        </div>

        <div className="form-control mb-3">
          <label className="label"><span className="label-text">{t("provider.influencer.fields.permits")}</span></label>
          <input type="file" className="file-input file-input-bordered" multiple />
        </div>

        <div className="mb-2">
          <div className="label"><span className="label-text">{t("provider.influencer.fields.platforms")}</span></div>
          <div className="grid md:grid-cols-2 gap-4">
            {platforms.map(p => (
              <div key={p} className="join">
                <label className="join-item btn btn-outline">
                  <input type="checkbox" className="checkbox mr-2" />
                  {t(platformKeys[p])}
                </label>
                <input
                  className="join-item input input-bordered w-32"
                  placeholder={t("provider.influencer.fields.followers")}
                  inputMode="numeric"
                  dir="ltr"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="form-control mb-3">
          <label className="label"><span className="label-text">{t("provider.influencer.fields.audience")}</span></label>
          <textarea className="textarea textarea-bordered" rows={3} />
        </div>

        <div className="form-control mb-3">
          <label className="label"><span className="label-text">{t("provider.influencer.fields.previousAds")}</span></label>
          <input type="file" className="file-input file-input-bordered" accept="application/pdf" multiple />
        </div>

        <div className="form-control mb-3">
          <label className="label cursor-pointer justify-start gap-3">
            <input type="checkbox" className="checkbox" />
            <span className="label-text">{t("provider.influencer.fields.hasManager")}</span>
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text">{t("provider.influencer.fields.managerName")}</span></label>
            <input className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">{t("provider.influencer.fields.managerPhone")}</span></label>
            <input className="input input-bordered" dir="ltr" />
          </div>
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <button className="btn btn-ghost" onClick={() => nav(-1)}>{t("actions.back")}</button>
          <button className="btn btn-primary">{t("actions.submit")}</button>
        </div>
      </div>
    </div>
  );
}
