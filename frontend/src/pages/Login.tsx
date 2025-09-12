import { login } from "../keycloak";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="hero min-h-screen">
      <div className="card w-full max-w-md bg-base-200 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-3xl justify-center">
            <span className="text-primary">Ad</span>Connect
          </h1>

          <button
            className="btn btn-primary btn-lg mt-4"
            onClick={() => login({ redirectUri: window.location.origin + "/" })}
          >
            Continue with Keycloak
          </button>

          <div className="divider">or</div>
          <p className="text-sm text-center">
            New here?{" "}
            <Link className="link link-hover" to="/register/sponsor">Sponsor signup</Link>
            {" "}·{" "}
            <Link className="link link-hover" to="/register/advertiser">Advertiser signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}


function ThemeSwatch({ name, label }: { name: any, label: string }) {
  return (
    <button
      className="p-3 rounded-xl border border-base-300 hover:scale-[1.02] transition"
      onClick={() => document.documentElement.setAttribute("data-theme", name)}
      data-theme={name}
    >
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-primary"></span>
        <span className="w-3 h-3 rounded-full bg-secondary"></span>
        <span className="w-3 h-3 rounded-full bg-accent"></span>
        <span className="text-sm ml-2">{label}</span>
      </div>
    </button>
  );
}
