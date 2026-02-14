import keycloak, { hasRole } from "../keycloak";
import RequireVerified from "../components/RequireVerified";

export default function Sponsor() {
  const tp: any = keycloak.tokenParsed || {};
  const name =
    tp.name ||
    [tp.given_name, tp.family_name].filter(Boolean).join(" ") ||
    tp.preferred_username;

  // ✅ THIS is the exact spot to compute verification
  const verified = hasRole("verified_user");

  function createProject() {
    // your action
  }

  return (
    <div>
      <h1>Welcome, {name}</h1>
      <p>You’re signed in as a Sponsor.</p>

      {/* ✅ THIS is where you show the pending banner */}
      {!verified && (
        <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 10, marginTop: 12 }}>
          <b>Pending verification</b>
          <div style={{ marginTop: 6 }}>
            You can browse providers/influencers/marketing companies, but actions are disabled until admin approves you.
          </div>
        </div>
      )}

      {/* ✅ THIS is exactly where RequireVerified goes: wrap ACTIONS only */}
      <div style={{ marginTop: 16 }}>
        <RequireVerified verified={verified}>
          <button onClick={createProject}>Create Project</button>
        </RequireVerified>
      </div>

      {/* Browsing content remains accessible */}
      <div style={{ marginTop: 16 }}>
        {/* ProviderList / InfluencerList / etc */}
      </div>
    </div>
  );
}
