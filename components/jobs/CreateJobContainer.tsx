"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { CreateOrEditJobType } from "@/utils/schema";
import { CreateJob } from "@/utils/actions";
import { JobMode, JobStatus, JobType } from "@/utils/types";
import CreateJobForm from "../form/JobForm";

const defaultFormValues = {
  position: "",
  company: "",
  location: "",
  status: JobStatus.Pending,
  type: JobType.FullTime,
  mode: JobMode.Hybrid,
};

function CreateJobContainer() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { push } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateOrEditJobType) => CreateJob(values),
    onSuccess: (data) => {
      if (!data) {
        toast({ variant: "destructive", description: "Something went wrong." });
      }
      toast({ description: "Job Created Successfully." });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
      push("/jobs");
    },
  });

  function onSubmit(values: CreateOrEditJobType): void {
    mutate(values);
  }

  return (
    <CreateJobForm
      defaultFormValues={defaultFormValues}
      onSubmit={onSubmit}
      isPending={isPending}
      submitButton="create job"
    />
  );
}
export default CreateJobContainer;
