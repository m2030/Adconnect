import { describe, it, expect } from "vitest";
import {
  toProfileCreatePayload,
  ProfileType,
  SeekerForm,
  InfluencerForm,
  MarketingCompanyForm,
  SponsorEntityForm,
} from "./payload";

describe("registration payload mapping", () => {
  it("SEEKER → budgets & flags", () => {
    const form: SeekerForm = {
      type: ProfileType.SEEKER,
      companyName: "Acme",
      interestedSponsorship: true,
      interestedMarketing: false,
      annualBudgetSponsorship: 100_000,
      annualBudgetMarketing: 0,
    };
    expect(toProfileCreatePayload("u1", form)).toEqual({
      userId: "u1",
      type: "SEEKER",
      surveyAnswers: {
        companyName: "Acme",
        interestedSponsorship: true,
        interestedMarketing: false,
        annualBudgetSponsorship: 100000,
        annualBudgetMarketing: 0
      }
    });
  });

  it("INFLUENCER → keeps accounts, sums followers", () => {
    const form: InfluencerForm = {
      type: ProfileType.INFLUENCER,
      name: "Star",
      targetAudience: { country: "SA", interests: ["sports","tech"] },
      hasManager: true,
      managerName: "Alice",
      managerPhone: "0550000000",
      accounts: [
        { platform: "INSTAGRAM", handle: "@star", followers: 500_000, url: "https://instagram.com/star" },
        { platform: "YOUTUBE", handle: "StarYT", followers: 120_000, url: "https://youtube.com/@star" },
      ],
    };
    const p = toProfileCreatePayload("u2", form);
    const total = p.surveyAnswers.accounts.reduce((s:number,a:any)=>s+(a.followers??0),0);
    expect(total).toBe(620000);
  });

  it("MARKETING_COMPANY → services & team", () => {
    const form: MarketingCompanyForm = {
      type: ProfileType.MARKETING_COMPANY,
      companyName: "MarketPro",
      services: ["ADS","INFLUENCER_MGMT","SEO"],
      companySize: 20,
      teamMembers: 7,
      hasAffiliatedInfluencers: true
    };
    expect(toProfileCreatePayload("u3", form)).toEqual({
      userId: "u3",
      type: "MARKETING_COMPANY",
      surveyAnswers: {
        companyName: "MarketPro",
        services: ["ADS","INFLUENCER_MGMT","SEO"],
        companySize: 20,
        teamMembers: 7,
        hasAffiliatedInfluencers: true
      }
    });
  });

  it("SPONSOR_ENTITY → prior examples", () => {
    const form: SponsorEntityForm = {
      type: ProfileType.SPONSOR_ENTITY,
      companyName: "EventOrg",
      hasPriorSponsorships: true,
      priorExamples: [{ name: "Expo 2023" }]
    };
    expect(toProfileCreatePayload("u4", form)).toEqual({
      userId: "u4",
      type: "SPONSOR_ENTITY",
      surveyAnswers: {
        companyName: "EventOrg",
        hasPriorSponsorships: true,
        priorExamples: [{ name: "Expo 2023" }]
      }
    });
  });
});
