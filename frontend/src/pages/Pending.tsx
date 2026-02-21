import { Link } from "react-router-dom";
import keycloak, { hasRole } from "../keycloak";

export default function Pending() {
  const verified = hasRole("verified_user");
  const tp: any = keycloak.tokenParsed || {};
  const name = tp.preferred_username || tp.email || "user";

  return (
    <div style={{ maxWidth: 700, margin: "60px auto", padding: 20 }}>
      <h2>Pending verification</h2>
      <p style={{ lineHeight: 1.6 }}>
        Hi <b>{name}</b>. Your account is waiting for admin approval.
        You can browse, but actions (submit/create) are disabled until you are verified.
      </p>

      {verified ? (
        <p>You are verified now. Go back to dashboard.</p>
      ) : (
        <p style={{ opacity: 0.8 }}>
          After the admin verifies you, logout/login (or refresh token) then try again.
        </p>
      )}

      <div style={{ marginTop: 16 }}>
        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
}