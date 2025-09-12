import keycloak from "../keycloak";

export default function Sponsor() {
  const tp: any = keycloak.tokenParsed || {};
  const name = tp.name || [tp.given_name, tp.family_name].filter(Boolean).join(" ") || tp.preferred_username;

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Welcome, {name} 👋</h1>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <p>You’re signed in as a <b>Sponsor</b>.</p>
          {/* ...your sponsor content... */}
        </div>
      </div>
    </main>
  );
}