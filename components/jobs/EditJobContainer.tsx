"use client";

import { editJob, getSingleJob } from "@/utils/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import JobsLoader from "../global/JobsLoader";
import { redirect, useRouter } from "next/navigation";
import JobForm from "../form/JobForm";
import { CreateOrEditJobType } from "@/utils/schema";
import { toast } from "../ui/use-toast";

function EditJobContainer({ jobID }: { jobID: string }) {
  const { push } = useRouter();

  //Query Client Functions
  const queryClient = useQueryClient();
  const { data: job, isPending } = useQuery({
    queryKey: ["job", jobID],
    queryFn: () => getSingleJob({ jobID }),
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: ({
      jobID,
      values,
    }: {
      jobID: string;
      values: CreateOrEditJobType;
    }) => editJob({ jobID, job: values }),
    onSuccess: (data) => {
      if (!data) {
        toast({ variant: "destructive", description: "Something went wrong." });
        return;
      }
      toast({ description: "Job updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", jobID] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      push("/jobs");
    },
  });

  function onSubmit(values: CreateOrEditJobType): void {
    mutate({ jobID, values });
  }

  if (isPending) {
    return <JobsLoader />;
  }

  if (job) {
    const { position, company, location, status, type, mode } = job;
    const defaultFormValues = {
      position,
      company,
      location,
      status,
      type,
      mode,
    } as CreateOrEditJobType;
    return (
      <JobForm
        defaultFormValues={defaultFormValues}
        isPending={isLoading}
        onSubmit={onSubmit}
        submitButton="edit job"
      />
    );
  }
  redirect("/");
}
export default EditJobContainer;
