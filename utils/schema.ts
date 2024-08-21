import { z } from "zod";
import { JobMode, JobStatus, JobType } from "./types";

export const jobSchema = z.object({
  position: z.string().min(2, {
    message: "Position needs to have atleast 2 characters.",
  }),
  company: z.string().min(1, {
    message: "Company needs to have atleast 1 character.",
  }),
  location: z.string().min(2, {
    message: "Location needs to have atleast 2 characters.",
  }),
  status: z.nativeEnum(JobStatus, {
    message: "Job status should be one of the given values.",
  }),
  type: z.nativeEnum(JobType, {
    message: "Job type should be one of the given values.",
  }),
  mode: z.nativeEnum(JobMode, {
    message: "Job mode should be one of the given values.",
  }),
});

export type CreateOrEditJobType = z.infer<typeof jobSchema>;
