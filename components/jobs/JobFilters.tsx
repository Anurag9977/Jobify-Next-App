"use client";

import { JobMode, JobStatus } from "@/utils/types";
import { Input } from "../ui/input";
import SelectFilter from "./SelectFilter";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useRef } from "react";
import { Label } from "../ui/label";

function JobFilters() {
  const refContainer = useRef<HTMLFormElement>(null);
  const { push } = useRouter();
  const path = usePathname();

  //Search Params
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "all";
  const mode = searchParams.get("mode") || "all";

  //Handle Submit
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newSearchParams = new URLSearchParams();
    const formData = new FormData(e.currentTarget);
    const search = (formData.get("search") as string) || "";
    const status = (formData.get("status") as string) || "all";
    const mode = (formData.get("mode") as string) || "all";
    newSearchParams.set("search", search);
    newSearchParams.set("status", status);
    newSearchParams.set("mode", mode);
    push(`${path}?${newSearchParams.toString()}`);
  }

  //Reset Form
  function resetForm() {
    push("/jobs");
    refContainer.current?.reset();
  }

  return (
    <form
      ref={refContainer}
      className="bg-muted rounded-xl px-8 py-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6"
      onSubmit={handleSubmit}
    >
      <div>
        <Label className="capitalize">search</Label>
        <Input
          type="text"
          name="search"
          placeholder="Search jobs..."
          className="bg-background self-end"
          defaultValue={search}
        />
      </div>

      <SelectFilter
        name="status"
        label="job status"
        items={["all", ...Object.values(JobStatus)]}
        defaultValue={status}
      />
      <SelectFilter
        name="mode"
        label="job mode"
        items={["all", ...Object.values(JobMode)]}
        defaultValue={mode}
      />
      <Button type="submit" className="self-end">
        Search
      </Button>
      <Button
        type="button"
        variant="destructive"
        className="self-end"
        onClick={resetForm}
      >
        Clear Filters
      </Button>
    </form>
  );
}
export default JobFilters;
