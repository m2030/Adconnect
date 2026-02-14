import { hasRole } from "../keycloak";
import RequireVerified from "../components/RequireVerified";

export default function Advertiser() {
  // ✅ verification computed at the top of the dashboard page
  const verified = hasRole("verified_user");

  function createCampaign() {
    // your action
  }

  return (
    <div>
      <h1>Advertiser Dashboard</h1>

      {/* ✅ pending banner */}
      {!verified && (
        <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 10, marginTop: 12 }}>
          <b>Pending verification</b>
          <div style={{ marginTop: 6 }}>
            You can browse projects, but actions are disabled until admin approves you.
          </div>
        </div>
      )}

      {/* ✅ wrap the action button (Create Campaign) */}
      <div style={{ marginTop: 16 }}>
        <RequireVerified verified={verified}>
          <button onClick={createCampaign}>Create Campaign</button>
        </RequireVerified>
      </div>

      {/* Browsing content stays available */}
      <div style={{ marginTop: 16 }}>
        {/* ProjectList / ProjectDetails links / etc */}
      </div>
    </div>
  );
}
