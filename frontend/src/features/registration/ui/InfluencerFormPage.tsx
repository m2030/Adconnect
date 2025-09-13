import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InfluencerSchema,
  type InfluencerForm,
  ProfileType,
  toProfileCreatePayload,
} from "../../../domain/registration/payload";
import { createProfile } from "../../../api/client";
import { useState } from "react";

export default function InfluencerFormPage() {
  const [createdId, setCreatedId] = useState<string | null>(null);
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<InfluencerForm>({
    resolver: zodResolver(InfluencerSchema),
    defaultValues: {
      type: ProfileType.INFLUENCER,
      name: "",
      hasManager: false,
      accounts: [{ platform: "INSTAGRAM", handle: "", followers: 0 }]
    }
  });
  const { fields, append, remove } = useFieldArray({ name: "accounts", control });

  const onSubmit = async (data: InfluencerForm) => {
    const payload = toProfileCreatePayload("user-123", data);
    try {
      const res = await createProfile(payload);
      setCreatedId(res.id);
    } catch (e) {
      console.warn("createProfile failed (ok in dev without API):", e);
      setCreatedId("dev-preview-id");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Influencer / Celebrity</h2>

          <input type="hidden" value={ProfileType.INFLUENCER} {...register("type", { value: ProfileType.INFLUENCER as any })} />

          <label className="form-control">
            <div className="label"><span className="label-text">Name</span></div>
            <input className="input input-bordered" {...register("name")} />
            {errors.name && <span className="text-error text-sm">{errors.name.message as string}</span>}
          </label>

          <div className="grid md:grid-cols-2 gap-4">
            <label className="form-control">
              <div className="label"><span className="label-text">Target country</span></div>
              <input className="input input-bordered" {...register("targetAudience.country")} />
            </label>
            <label className="form-control">
              <div className="label"><span className="label-text">Interests (comma separated)</span></div>
              <input className="input input-bordered"
                     {...register("targetAudience.interests" as const, {
                       setValueAs: (v: string) => v ? v.split(",").map(s => s.trim()).filter(Boolean) : []
                     })} />
            </label>
          </div>

          <label className="label cursor-pointer w-fit mt-2">
            <input type="checkbox" className="checkbox mr-2" {...register("hasManager")} />
            <span className="label-text">I have a business manager</span>
          </label>

          <div className="grid md:grid-cols-2 gap-4">
            <label className="form-control">
              <div className="label"><span className="label-text">Manager name</span></div>
              <input className="input input-bordered" {...register("managerName")} />
            </label>
            <label className="form-control">
              <div className="label"><span className="label-text">Manager phone</span></div>
              <input className="input input-bordered" {...register("managerPhone")} />
            </label>
          </div>

          <div className="divider">Accounts</div>
          {fields.map((f, i) => (
            <div key={f.id} className="grid md:grid-cols-4 gap-3 items-end">
              <label className="form-control">
                <div className="label"><span className="label-text">Platform</span></div>
                <select className="select select-bordered" {...register(`accounts.${i}.platform`)}>
                  <option value="INSTAGRAM">Instagram</option>
                  <option value="TIKTOK">TikTok</option>
                  <option value="SNAPCHAT">Snapchat</option>
                  <option value="YOUTUBE">YouTube</option>
                  <option value="X">X</option>
                  <option value="FACEBOOK">Facebook</option>
                  <option value="OTHER">Other</option>
                </select>
              </label>
              <label className="form-control">
                <div className="label"><span className="label-text">Handle</span></div>
                <input className="input input-bordered" {...register(`accounts.${i}.handle`)} />
              </label>
              <label className="form-control">
                <div className="label"><span className="label-text">Followers</span></div>
                <input type="number" className="input input-bordered" {...register(`accounts.${i}.followers`, { valueAsNumber: true })} />
              </label>
              <div className="flex gap-2">
                <button type="button" className="btn" onClick={() => append({ platform: "INSTAGRAM", handle: "", followers: 0 })}>Add</button>
                <button type="button" className="btn btn-ghost" onClick={() => remove(i)} disabled={fields.length === 1}>Remove</button>
              </div>
            </div>
          ))}

          <button className="btn btn-primary mt-4" disabled={isSubmitting}>Create profile</button>

          {createdId && (
            <div className="alert alert-info mt-4">
              <span>Created profile: {createdId}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

