import JobFilters from "@/components/jobs/JobFilters";
import JobsList from "@/components/jobs/JobsList";
import { getAllJobs } from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

async function JobsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["jobs", "", "all", "all", 1],
    queryFn: () => getAllJobs({}),
  });
  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <JobFilters />
        <section className="mt-8">
          <JobsList />
        </section>
      </HydrationBoundary>
    </main>
  );
}
export default JobsPage;
