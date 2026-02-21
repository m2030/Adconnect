// frontend/src/pages/RegisterAdvertiser.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function RegisterAdvertiser() {
  const nav = useNavigate();

  const [firstName, setFirstName] = useState("Test");
  const [lastName, setLastName] = useState("User");
  const [email, setEmail] = useState("test@brand.com");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOk(false);
    setLoading(true);

    try {
      const payload = {
        email: email.trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        redirect_uri: `${window.location.origin}/`,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/api/register/advertiser`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 200 || res.status === 201 || res.data?.ok) {
        setOk(true);
        nav("/", { replace: true }); // ✅ Step 3: go Home after successful registration
      }
    } catch (e: any) {
      const msg =
        e?.response?.data?.detail ||
        e?.response?.data?.error ||
        "Registration failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "60px auto", padding: 20 }}>
      <h1>Advertiser Registration</h1>
      <p style={{ opacity: 0.8 }}>
        Allowed domains (dev): <code>brand.com</code>, <code>ads.brand.com</code>
      </p>

      {error && (
        <div style={{ padding: 12, border: "1px solid #f3c", borderRadius: 10, marginTop: 12 }}>
          <b>Error:</b> {error}
        </div>
      )}

      {ok && (
        <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 10, marginTop: 12 }}>
          Registered successfully. Redirecting…
        </div>
      )}

      <form onSubmit={onSubmit} style={{ marginTop: 16, display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>First name</span>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Last name</span>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      <div style={{ marginTop: 18 }}>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}