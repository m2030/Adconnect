import axios from "axios";
import { useState } from "react";

export default function RegisterAdvertiser() {
  const [email, setEmail] = useState("");
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    try {
      await api.post("/api/register/advertiser", {
        email, first_name: firstName, last_name: lastName,
        redirect_uri: window.location.origin + "/"
      });
      setMessage("Success! Check your inbox to verify email and set a password.");
    } catch (err: any) {
      setMessage(err?.response?.data?.detail || "Registration failed.");
    }
  }

  return (
    <div className="hero min-h-screen">
      <div className="card w-full max-w-md bg-base-200 shadow-xl">
        <form className="card-body" onSubmit={submit}>
          <h1 className="card-title text-3xl">Advertiser registration</h1>
          <label className="form-control">
            <span className="label-text">Official email</span>
            <input className="input input-bordered" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
            <span className="label-text-alt">Must be from an approved advertiser domain.</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className="form-control">
              <span className="label-text">First name</span>
              <input className="input input-bordered" value={firstName} onChange={e=>setFirst(e.target.value)} />
            </label>
            <label className="form-control">
              <span className="label-text">Last name</span>
              <input className="input input-bordered" value={lastName} onChange={e=>setLast(e.target.value)} />
            </label>
          </div>
          <button className="btn btn-primary mt-2" type="submit">Create account</button>
          {message && <div className="alert mt-2">{message}</div>}
        </form>
      </div>
    </div>
  );
}