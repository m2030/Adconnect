// frontend/src/App.tsx
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { initKeycloak, isAuthenticated, hasRole, login, logout } from "./keycloak";
import { setTheme } from "./theme";
import Sponsor from "./pages/Sponsor";
import Advertiser from "./pages/Advertiser";
import Login from "./pages/Login";
import RegisterSponsor from "./pages/RegisterSponsor";
import RegisterAdvertiser from "./pages/RegisterAdvertiser";
import "./index.css";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTheme("brand");
    initKeycloak()
      .catch((e) => {
        console.error("Keycloak init failed (showing login anyway):", e);
      })
      .finally(() => setReady(true)); // <- always render UI
  }, []);

  if (!ready) {
    return <div className="h-screen flex items-center justify-center">Loading…</div>;
  }

  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<LandingRouter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sponsor" element={<Guard need="sponsor"><Sponsor /></Guard>} />
        <Route path="/advertiser" element={<Guard need="advertiser"><Advertiser /></Guard>} />
        <Route path="/register/sponsor" element={<RegisterSponsor />} />
        <Route path="/register/advertiser" element={<RegisterAdvertiser />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function LandingRouter() {
  useEffect(() => {
    if (!isAuthenticated()) { setTheme("brand"); return; }
    if (hasRole("sponsor")) setTheme("sponsor");
    else if (hasRole("advertiser")) setTheme("advertiser");
  }, []);

  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (hasRole("sponsor")) return <Navigate to="/sponsor" replace />;
  if (hasRole("advertiser")) return <Navigate to="/advertiser" replace />;
  return <Navigate to="/login" replace />;
}

function Guard({ need, children }: { need: "sponsor" | "advertiser"; children: JSX.Element }) {
  const location = useLocation();
  if (!isAuthenticated() || !hasRole(need)) return <Navigate to="/login" state={{ from: location }} replace />;
  useEffect(() => { setTheme(need); }, [need]);
  return children;
}

function TopBar() {
  const nav = useNavigate();
  return (
    <div className="navbar bg-base-200 border-b border-base-300">
      <div className="flex-1">
        <button className="btn btn-ghost text-xl" onClick={() => nav("/")}>AdConnect</button>
      </div>
      <div className="flex-none">
        <button className="btn btn-outline btn-sm" onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
}
