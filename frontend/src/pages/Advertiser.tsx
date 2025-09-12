export default function Advertiser() {
  return (
    <main className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Advertiser Dashboard</h1>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <p>Welcome, Advertiser! Bold colors to spark creativity.</p>
          <button className="btn btn-primary">Create Campaign</button>
        </div>
      </div>
    </main>
  );
}