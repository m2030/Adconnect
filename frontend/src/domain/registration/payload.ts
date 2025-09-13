import { z } from "zod";

export enum ProfileType {
  SEEKER = "SEEKER",
  SPONSOR_ENTITY = "SPONSOR_ENTITY",
  MARKETING_COMPANY = "MARKETING_COMPANY",
  INFLUENCER = "INFLUENCER",
}

export const SeekerSchema = z.object({
  type: z.literal(ProfileType.SEEKER),
  companyName: z.string().min(1),
  interestedSponsorship: z.boolean().optional(),
  interestedMarketing: z.boolean().optional(),
  annualBudgetSponsorship: z.number().nonnegative().optional(),
  annualBudgetMarketing: z.number().nonnegative().optional(),
});
export type SeekerForm = z.infer<typeof SeekerSchema>;

export const SponsorEntitySchema = z.object({
  type: z.literal(ProfileType.SPONSOR_ENTITY),
  companyName: z.string().min(1),
  hasPriorSponsorships: z.boolean().optional(),
  priorExamples: z.array(z.object({ name: z.string() })).optional(),
});
export type SponsorEntityForm = z.infer<typeof SponsorEntitySchema>;

export const MarketingCompanySchema = z.object({
  type: z.literal(ProfileType.MARKETING_COMPANY),
  companyName: z.string().min(1).optional(),
  services: z.array(z.enum(["CONTENT","ADS","INFLUENCER_MGMT","SEO","SOCIAL","PERFORMANCE"])).default([]),
  companySize: z.number().int().nonnegative().optional(),
  teamMembers: z.number().int().nonnegative().optional(),
  hasAffiliatedInfluencers: z.boolean().optional(),
});
export type MarketingCompanyForm = z.infer<typeof MarketingCompanySchema>;

export const InfluencerSchema = z.object({
  type: z.literal(ProfileType.INFLUENCER),
  name: z.string(),
  targetAudience: z.object({
    country: z.string().optional(),
    interests: z.array(z.string()).optional(),
  }).optional(),
  hasManager: z.boolean().optional(),
  managerName: z.string().optional(),
  managerPhone: z.string().optional(),
  accounts: z.array(z.object({
    platform: z.enum(["TIKTOK","INSTAGRAM","SNAPCHAT","YOUTUBE","X","FACEBOOK","OTHER"]),
    handle: z.string(),
    followers: z.number().int().nonnegative().optional(),
    url: z.string().url().optional(),
  })).default([]),
});
export type InfluencerForm = z.infer<typeof InfluencerSchema>;

export type AnyForm =
  | SeekerForm
  | SponsorEntityForm
  | MarketingCompanyForm
  | InfluencerForm;

export type ProfileCreatePayload = {
  userId: string;
  type: ProfileType;
  surveyAnswers: Record<string, any>;
};

export function toProfileCreatePayload(userId: string, form: AnyForm): ProfileCreatePayload {
  switch (form.type) {
    case ProfileType.SEEKER:
      return {
        userId,
        type: ProfileType.SEEKER,
        surveyAnswers: {
          companyName: form.companyName,
          interestedSponsorship: !!form.interestedSponsorship,
          interestedMarketing: !!form.interestedMarketing,
          annualBudgetSponsorship: form.annualBudgetSponsorship ?? 0,
          annualBudgetMarketing: form.annualBudgetMarketing ?? 0,
        },
      };
    case ProfileType.SPONSOR_ENTITY:
      return {
        userId,
        type: ProfileType.SPONSOR_ENTITY,
        surveyAnswers: {
          companyName: form.companyName,
          hasPriorSponsorships: !!form.hasPriorSponsorships,
          priorExamples: form.priorExamples ?? [],
        },
      };
    case ProfileType.MARKETING_COMPANY:
      return {
        userId,
        type: ProfileType.MARKETING_COMPANY,
        surveyAnswers: {
          companyName: form.companyName ?? "",
          services: form.services ?? [],
          companySize: form.companySize ?? null,
          teamMembers: form.teamMembers ?? null,
          hasAffiliatedInfluencers: !!form.hasAffiliatedInfluencers,
        },
      };
    case ProfileType.INFLUENCER:
      return {
        userId,
        type: ProfileType.INFLUENCER,
        surveyAnswers: {
          name: form.name,
          targetAudience: form.targetAudience ?? {},
          hasManager: !!form.hasManager,
          managerName: form.managerName ?? null,
          managerPhone: form.managerPhone ?? null,
          accounts: (form.accounts ?? []).map(a => ({
            platform: a.platform,
            handle: a.handle,
            followers: a.followers ?? 0,
            url: a.url ?? null,
          })),
        },
      };
  }
}
