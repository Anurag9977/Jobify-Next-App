import SectionTitle from "@/components/global/SectionTitle";
import CreateJobContainer from "@/components/jobs/CreateJobContainer";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

function AddJobPage() {
  const queryClient = new QueryClient();
  return (
    <main>
      <SectionTitle title="add job" />
      <div className="my-4">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CreateJobContainer />
        </HydrationBoundary>
      </div>
    </main>
  );
}
export default AddJobPage;
