import * as React from "react";
import type { AnyForm } from "../../../domain/registration/payload";
import { toProfileCreatePayload } from "../../../domain/registration/payload";
import { createProfile } from "../../../api/client";

type Props = { userId: string; form: AnyForm };

export function RegistrationSubmitButton({ userId, form }: Props) {
  const [result, setResult] = React.useState<null | { id: string }>(null);

  const onClick = async () => {
    const payload = toProfileCreatePayload(userId, form);
    const r = await createProfile(payload);
    setResult({ id: r.id });
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={onClick}>Create profile</button>
      {result && <div>Created profile: {result.id}</div>}
    </div>
  );
}
