import React from "react";

export default function PendingVerificationBanner({
  roleLabel,
  onRefresh,
}: {
  roleLabel: string;
  onRefresh: () => Promise<void>;
}) {
  return (
    <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 10, marginBottom: 16 }}>
      <b>Pending verification</b>
      <div style={{ marginTop: 6, lineHeight: 1.5 }}>
        Your {roleLabel} account is waiting for admin approval.
        You can browse the dashboard, but actions are disabled until verification.
      </div>
      <button onClick={onRefresh} style={{ marginTop: 10 }}>
        Check status
      </button>
    </div>
  );
}
