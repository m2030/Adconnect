// src/test/smoke.test.tsx
import { describe, it, expect } from "vitest";

describe("smoke", () => {
  it("runs", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    expect(div).toBeInTheDocument();
  });
});
