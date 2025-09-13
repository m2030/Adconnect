import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { RegistrationSubmitButton } from "./ui/RegistrationSubmitButton";
import { ProfileType } from "../../domain/registration/payload";

const server = setupServer(
  http.post("/api/profiles", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: "pid-123", ...body });
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("Registration submit", () => {
  it("POSTs mapped payload and shows id", async () => {
    render(
      <RegistrationSubmitButton
        userId="user-1"
        form={{
          type: ProfileType.SEEKER,
          companyName: "Acme",
          interestedSponsorship: true,
          interestedMarketing: false,
          annualBudgetSponsorship: 100000,
          annualBudgetMarketing: 0
        }}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /create profile/i }));
    await waitFor(() => expect(screen.getByText(/Created profile: pid-123/)).toBeInTheDocument());
  });
});
