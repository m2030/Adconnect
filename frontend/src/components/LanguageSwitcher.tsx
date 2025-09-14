// src/components/LanguageSwitcher.tsx
import { useState, startTransition } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation(["common"]); // optional
  const [open, setOpen] = useState(false);

  const pick = (lng: "en" | "ar") => {
    startTransition(() => i18n.changeLanguage(lng));
    setOpen(false);                                // close dropdown
    (document.activeElement as HTMLElement)?.blur(); // drop focus so it won't reopen
  };

  return (
    <div className={`dropdown dropdown-end ${open ? "dropdown-open" : ""}`}>
      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {i18n.language.startsWith("ar") ? "العربية" : "English"}
      </button>

      <ul
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44 z-50"
        role="listbox"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      >
        <li>
          <button type="button" onClick={() => pick("ar")}>العربية</button>
        </li>
        <li>
          <button type="button" onClick={() => pick("en")}>English</button>
        </li>
      </ul>
    </div>
  );
}
