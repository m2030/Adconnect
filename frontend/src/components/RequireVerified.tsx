import React from "react";

export default function RequireVerified({
  verified,
  children,
}: {
  verified: boolean;
  children: React.ReactNode;
}) {
  if (verified) return <>{children}</>;

  return (
    <span title="Pending verification: actions are disabled until admin approves your account.">
      <span style={{ pointerEvents: "none", opacity: 0.5 }}>{children}</span>
    </span>
  );
}