import type { ProfileCreatePayload } from "../domain/registration/payload";
const API_BASE = import.meta.env.VITE_API_BASE ?? "";

export async function createProfile(p: ProfileCreatePayload) {
  const res = await fetch(`${API_BASE}/api/profiles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(p)
  });
  if (!res.ok) throw new Error(`createProfile failed: ${res.status}`);
  return res.json() as Promise<{ id: string } & ProfileCreatePayload>;
}
