// frontend/src/features/registration/ui/ProviderChoice.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ProviderChoice() {
  const nav = useNavigate();
  // Load both namespaces: "translation" (default app strings) and "common"
  const { t, i18n } = useTranslation(["translation", "common"]);

  useEffect(() => {
    // Dev-only: surface missing i18n keys in console with correct namespaces
    if (import.meta.env.DEV) {
      const toCheck: Array<{ k: string; ns: "translation" | "common" }> = [
        { k: "register.provider.title", ns: "translation" },
        { k: "register.provider.subtitle", ns: "translation" },
        { k: "register.provider.agency", ns: "translation" },
        { k: "register.provider.sponsorshipEntity", ns: "translation" },
        { k: "register.provider.influencer", ns: "translation" },
        { k: "back", ns: "common" }
      ];
      toCheck.forEach(({ k, ns }) => {
        if (!i18n.exists(k, { ns })) {
          console.warn("[i18n] missing key:", `${ns}:${k}`, "lang=", i18n.resolvedLanguage ?? i18n.language);
        }
      });
    }

    // Optional: enforce lang/dir (if not already handled globally)
    const lng = i18n.resolvedLanguage || i18n.language;
    document.documentElement.lang = lng;
    document.documentElement.dir = lng?.startsWith("ar") ? "rtl" : "ltr";
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
                onClick={() =>  nav("/register/provider/marketing")}
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
                {t("common:back")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
