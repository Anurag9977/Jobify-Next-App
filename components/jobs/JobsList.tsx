"use client";

import { getAllJobs } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import JobsLoader from "../global/JobsLoader";
import JobCard from "./JobCard";
import { useSearchParams } from "next/navigation";
import PaginationContainer from "../pagination/PaginationContainer";

function JobsList() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "all";
  const mode = searchParams.get("mode") || "all";
  const page = Number(searchParams.get("page")) || 1;
  const { data, isPending } = useQuery({
    queryKey: ["jobs", search, status, mode, page],
    queryFn: () => getAllJobs({ search, status, mode, page }),
  });

  // Jobs Loading
  if (isPending) {
    return <JobsLoader />;
  }

  //Data is NULL
  if (!data) {
    return null;
  }

  // Empty List
  if (data?.jobs.length === 0) {
    return (
      <h1 className="text-lg tracking-wide capitalize font-medium">
        no jobs found...
      </h1>
    );
  }

  return (
    <>
      <PaginationContainer
        totalJobs={data.totalJobs}
        page={data.page}
        totalPages={data.totalPages}
      />
      <div className="mt-8 grid md:grid-cols-2 gap-y-6 gap-x-8">
        {data?.jobs.map((job) => {
          return <JobCard key={job.id} {...job} />;
        })}
      </div>
    </>
  );
}
export default JobsList;
