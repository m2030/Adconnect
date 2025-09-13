// frontend/src/features/registration/ui/ProviderChoice.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ProviderChoice() {
  const nav = useNavigate();
  const { t, i18n } = useTranslation(); // <- define t here first

  useEffect(() => {
    // Dev-only: surface missing i18n keys in console
    if (import.meta.env.DEV) {
      const keys = [
        "register.provider.title",
        "register.provider.subtitle",
        "register.provider.agency",
        "register.provider.sponsorshipEntity",
        "register.provider.influencer",
        "common.back"
      ];
      keys.forEach((k) => {
        // prefer exists() so it doesn't change output
        if (!i18n.exists(k)) {
          console.warn("[i18n] missing key:", k, "lang=", i18n.language);
        }
      });
    }

    // Optional: enforce lang/dir (if you don't already do this globally)
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language.startsWith("ar") ? "rtl" : "ltr";
  }, [i18n]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-2xl justify-center mb-2">
              {t("register.provider.title")}
            </h1>
            <p className="text-center opacity-70 mb-6">
              {t("register.provider.subtitle")}
            </p>

            <div className="grid gap-3 md:grid-cols-3">
              <button
                className="card bg-base-100 border border-base-300 hover:shadow-md transition"
                onClick={() => nav("/register/provider/agency")}
              >
                <div className="card-body items-center text-center">
                  <span className="text-lg font-semibold">
                    {t("register.provider.agency")}
                  </span>
                </div>
              </button>

              <button
                className="card bg-base-100 border border-base-300 hover:shadow-md transition"
                onClick={() => nav("/register/provider/sponsorship")}
              >
                <div className="card-body items-center text-center">
                  <span className="text-lg font-semibold">
                    {t("register.provider.sponsorshipEntity")}
                  </span>
                </div>
              </button>

              <button
                className="card bg-base-100 border border-base-300 hover:shadow-md transition"
                onClick={() => nav("/register/provider/influencer")}
              >
                <div className="card-body items-center text-center">
                  <span className="text-lg font-semibold">
                    {t("register.provider.influencer")}
                  </span>
                </div>
              </button>
            </div>

            <div className="mt-6 flex justify-center">
              <button className="btn btn-ghost" onClick={() => nav(-1)}>
                {t("common.back")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
