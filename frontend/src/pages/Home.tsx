import { Link } from "react-router-dom";
import keycloak, { hasRole, isAuthenticated, login, logout } from "../keycloak";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hasRole, isAuthenticated } from "../keycloak";

const nav = useNavigate();

useEffect(() => {
  if (!isAuthenticated()) return;
  if (hasRole("sponsor")) nav("/sponsor");
  if (hasRole("advertiser")) nav("/advertiser");
}, []);
export default function Home() {
  const authed = isAuthenticated();
  const tp: any = keycloak.tokenParsed || {};

  const name =
    tp.name ||
    [tp.given_name, tp.family_name].filter(Boolean).join(" ") ||
    tp.preferred_username ||
    tp.email ||
    "Guest";

  const roles: string[] = tp?.realm_access?.roles ?? [];
  const verified = hasRole("verified_user");

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h1 style={{ marginBottom: 8 }}>Adconnect Demo Home</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Status: <b>{authed ? "Logged in" : "Logged out"}</b>
      </p>

      <div style={{ display: "flex", gap: 10, margin: "16px 0" }}>
        {!authed ? (
          <button onClick={() => login()}>Login</button>
        ) : (
          <button onClick={() => logout()}>Logout</button>
        )}

        {authed && (
          <button
            onClick={async () => {
              try {
                await keycloak.updateToken(0);
                window.location.reload();
              } catch {
                window.location.reload();
              }
            }}
          >
            Refresh Token
          </button>
        )}
      </div>

      <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 10 }}>
        <div>
          User: <b>{name}</b>
        </div>
        <div style={{ marginTop: 6 }}>
          Verified:{" "}
          <b style={{ color: verified ? "inherit" : "inherit" }}>
            {verified ? "Yes" : "No (Pending admin verification)"}
          </b>
        </div>
        <div style={{ marginTop: 6 }}>
          Roles: <code>{roles.length ? roles.join(", ") : "none"}</code>
        </div>
      </div>

      {authed && !verified && (
        <div
          style={{
            marginTop: 16,
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 10,
          }}
        >
          <b>Pending verification</b>
          <div style={{ marginTop: 6 }}>
            You can browse dashboards, but actions (submit/create) should be blocked until admin assigns{" "}
            <code>verified_user</code>.
          </div>
          <div style={{ marginTop: 10 }}>
            <Link to="/pending">Open Pending Page</Link>
          </div>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <h3 style={{ marginBottom: 8 }}>Go to dashboards</h3>

        <div style={{ display: "flex", gap: 12 }}>
          {hasRole("sponsor") ? (
            <Link to="/sponsor">Sponsor Dashboard</Link>
          ) : (
            <span style={{ opacity: 0.6 }}>Sponsor Dashboard (requires sponsor role)</span>
          )}

          {hasRole("advertiser") ? (
            <Link to="/advertiser">Advertiser Dashboard</Link>
          ) : (
            <span style={{ opacity: 0.6 }}>Advertiser Dashboard (requires advertiser role)</span>
          )}
        </div>
      </div>
    </div>
  );
}