import { useEffect, useState } from "react";
import axios from "axios";
import RequireVerified from "../components/RequireVerified";

type Me = { verified: boolean; roles: string[] };

export default function Advertiser() {
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    axios.get("/api/me").then(r => setMe(r.data)).catch(() => setMe({ verified: false, roles: [] }));
  }, []);

  const verified = me?.verified ?? false;

  function submitAction() {
    // your submit action (POST)
  }

  return (
    <div>
      {!verified && (
        <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 10, marginBottom: 16 }}>
          <b>Pending verification</b>
          <div style={{ marginTop: 6 }}>
            Your account is waiting for admin approval. You can browse, but actions are disabled.
          </div>
        </div>
      )}

      <RequireVerified verified={verified}>
        <button onClick={submitAction}>Submit</button>
      </RequireVerified>
    </div>
  );
}