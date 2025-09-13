// frontend/src/App.tsx
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { initKeycloak, isAuthenticated, hasRole, login, logout } from "./keycloak";
import { setTheme } from "./theme";
import "./i18n"; // <-- add this at the very top (before using t/useTranslation)

import Sponsor from "./pages/Sponsor";
import Advertiser from "./pages/Advertiser";
import Login from "./pages/Login";
import RegisterSponsor from "./pages/RegisterSponsor";
import RegisterAdvertiser from "./pages/RegisterAdvertiser";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import RegistrationStart from "./features/registration/ui/RegistrationStart";
import ProviderChoice from "./features/registration/ui/ProviderChoice";
import SeekerFormPage from "./features/registration/ui/SeekerFormPage";
import InfluencerFormPage from "./features/registration/ui/InfluencerFormPage";
import "./index.css";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // default look before auth check
    setTheme("brand");
    initKeycloak()
      .catch((e) => {
        console.error("Keycloak init failed (showing public UI):", e);
      })
      .finally(() => setReady(true)); // always render
  }, []);

  if (!ready) {
    return <div className="h-screen flex items-center justify-center">Loading…</div>;
  }

  return (
    <BrowserRouter>
      <TopBar />
      <div className="container mx-auto p-4">
        <Routes>
          {/* Public landing: send guests to registration; authed users go to their dashboard */}
          <Route path="/" element={<LandingRouter />} />

          {/* Public auth routes */}
          <Route path="/login" element={<Login />} />

          {/* Public registration flow (always accessible) */}
          <Route path="/register" element={<RegistrationStart />} />
          <Route path="/register/provider" element={<ProviderChoice />} />
          <Route path="/register/seeker" element={<SeekerFormPage />} />
          <Route path="/register/provider/influencer" element={<InfluencerFormPage />} />
          <Route path="/register/provider" element={<ProviderChoice />} />

          {/* Your legacy/public registration pages (keep if you still use them) */}
          <Route path="/register/sponsor" element={<RegisterSponsor />} />
          <Route path="/register/advertiser" element={<RegisterAdvertiser />} />

          {/* Private dashboards (role-gated) */}
          <Route
            path="/sponsor"
            element={
              <Guard need="sponsor">
                <Sponsor />
              </Guard>
            }
          />
          <Route
            path="/advertiser"
            element={
              <Guard need="advertiser">
                <Advertiser />
              </Guard>
            }
          />

          {/* 404 → home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

/** decides where to send the user when visiting "/" */
function LandingRouter() {
  useEffect(() => {
    if (!isAuthenticated()) {
      // public theme on first paint
      setTheme("brand");
      return;
    }
    // switch theme based on role after auth
    if (hasRole("sponsor")) setTheme("sponsor");
    else if (hasRole("advertiser")) setTheme("advertiser");
  }, []);

  // guests: go straight to registration to see the UI
  if (!isAuthenticated()) return <Navigate to="/register" replace />;

  // authed: route by role
  if (hasRole("sponsor")) return <Navigate to="/sponsor" replace />;
  if (hasRole("advertiser")) return <Navigate to="/advertiser" replace />;

  // default fallback
  return <Navigate to="/login" replace />;
}

/** simple role-based guard for private pages */
function Guard({ need, children }: { need: "sponsor" | "advertiser"; children: JSX.Element }) {
  const location = useLocation();

  if (!isAuthenticated() || !hasRole(need)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // set theme when entering a private area
  useEffect(() => {
    setTheme(need);
  }, [need]);

  return children;
}

/** top bar with contextual actions */
function TopBar() {
  const nav = useNavigate();
  const authed = isAuthenticated();
  const { t } = useTranslation("common");
  return (
  <div className="navbar bg-base-100 border-b border-base-300">
      <div className="flex-1">
        <button className="btn btn-ghost text-xl" onClick={() => nav("/")}>
          {t("appName")}
        </button>
      </div>
      <div className="flex-none gap-2">
        <LanguageSwitcher />
        {!authed && (
          <>
            <button className="btn btn-ghost btn-sm" onClick={() => nav("/register")}>
              {t("register")}
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => login()}>
              {t("login")}
            </button>
          </>
        )}
        {authed && (
          <button className="btn btn-outline btn-sm" onClick={() => logout()}>
            {t("logout")}
          </button>
        )}
      </div>
    </div>
  );
}
