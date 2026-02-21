import "./i18n";
import "./index.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { initKeycloak } from "./keycloak";

import Home from "./pages/Home";
import Pending from "./pages/Pending";

import Sponsor from "./pages/Sponsor";
import Advertiser from "./pages/Advertiser";

import RegistrationStart from "./features/registration/ui/RegistrationStart";
import ProviderChoice from "./features/registration/ui/ProviderChoice";
import SeekerFormPage from "./features/registration/ui/SeekerFormPage";
import ProviderSponsorshipEntityFormPage from "./features/registration/ui/ProviderSponsorshipEntityFormPage";
import ProviderMarketingCompanyFormPage from "./features/registration/ui/ProviderMarketingCompanyFormPage";
import ProviderInfluencerFormPage from "./features/registration/ui/ProviderInfluencerFormPage";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initKeycloak().finally(() => setReady(true));
  }, []);

  if (!ready) return <div style={{ padding: 16 }}>Loading…</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/pending" element={<Pending />} />

        <Route path="/register" element={<RegistrationStart />} />
        <Route path="/register/provider" element={<ProviderChoice />} />
        <Route path="/register/seeker" element={<SeekerFormPage />} />
        <Route path="/register/provider/sponsorship-entity" element={<ProviderSponsorshipEntityFormPage />} />
        <Route path="/register/provider/marketing-company" element={<ProviderMarketingCompanyFormPage />} />
        <Route path="/register/provider/influencer" element={<ProviderInfluencerFormPage />} />

        {/* Private dashboards (keep your Guard logic if you already have it) */}
        <Route path="/sponsor" element={<Sponsor />} />
        <Route path="/advertiser" element={<Advertiser />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}