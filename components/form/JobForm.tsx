"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { CreateOrEditJobType, jobSchema } from "@/utils/schema";
import { JobMode, JobStatus, JobType } from "@/utils/types";
import FormInputField from "./FormInputField";
import FormSelectField from "./FormSelectField";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

type JobFormProps = {
  defaultFormValues: CreateOrEditJobType;
  onSubmit: (values: CreateOrEditJobType) => void;
  isPending: boolean;
  submitButton: "create job" | "edit job";
};

function JobForm({
  defaultFormValues,
  onSubmit,
  isPending,
  submitButton,
}: JobFormProps) {
  // Form
  const form = useForm<CreateOrEditJobType>({
    resolver: zodResolver(jobSchema),
    defaultValues: { ...defaultFormValues },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted py-6 px-8 rounded-lg"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FormInputField name="position" control={form.control} />
          <FormInputField name="company" control={form.control} />
          <FormInputField name="location" control={form.control} />
          <FormSelectField
            name="status"
            label="job status"
            control={form.control}
            items={Object.values(JobStatus)}
          />
          <FormSelectField
            name="type"
            label="job type"
            control={form.control}
            items={Object.values(JobType)}
          />
          <FormSelectField
            name="mode"
            label="job mode"
            control={form.control}
            items={Object.values(JobMode)}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="mt-4 capitalize tracking-wide"
          >
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                please wait
              </>
            ) : (
              submitButton
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default JobForm;
