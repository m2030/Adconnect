import { useState } from "react";
import { validateCompanyEmail } from "../utils/companyEmail";

export default function RegisterSponsor() {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [serverErr, setServerErr] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);

  const validateNow = () => {
    const err = validateCompanyEmail(email);
    setEmailErr(err);
    return !err;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerErr(null);
    setOkMsg(null);
    if (!validateNow()) return;

    try {
      setSubmitting(true);
      // call your backend endpoint for sponsor registration
      const resp = await fetch("/api/register/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email }),
      });
      if (!resp.ok) throw new Error((await resp.text()) || "Failed");
      setOkMsg("Registration received! Check your email for next steps.");
      setName(""); setCompany(""); setEmail("");
    } catch (err: any) {
      setServerErr(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="card w-full max-w-xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Sponsor Registration</h2>

          {serverErr && <div className="alert alert-error">{serverErr}</div>}
          {okMsg && <div className="alert alert-success">{okMsg}</div>}

          <form onSubmit={onSubmit} noValidate>
            <div className="form-control">
              <label className="label"><span className="label-text">Full name</span></label>
              <input
                className="input input-bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-control mt-3">
              <label className="label"><span className="label-text">Company</span></label>
              <input
                className="input input-bordered"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>

            {/* EMAIL with company-only validation */}
            <div className="form-control mt-3">
              <label className="label"><span className="label-text">Work email</span></label>
              <input
                type="email"
                className={`input input-bordered ${emailErr ? "input-error" : ""}`}
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (emailErr) setEmailErr(null); }}
                onBlur={validateNow}  // <-- run validator on blur
                required
              />
              {emailErr && <span className="text-error text-sm mt-1">{emailErr}</span>}
              <label className="label">
                <span className="label-text-alt">Personal domains (Gmail/Hotmail/etc.) are not accepted.</span>
              </label>
            </div>

            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={submitting || !!emailErr}
              >
                {submitting ? "Submitting..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
