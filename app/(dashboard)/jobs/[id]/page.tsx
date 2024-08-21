import SectionTitle from "@/components/global/SectionTitle";
import EditJobContainer from "@/components/jobs/EditJobContainer";
import { getSingleJob } from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

async function EditJobPage({ params: { id } }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["job", id],
    queryFn: () => getSingleJob({ jobID: id }),
  });
  return (
    <main>
      <SectionTitle title="edit job" />
      <div className="my-4">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <EditJobContainer jobID={id} />
        </HydrationBoundary>
      </div>
    </main>
  );
}
export default EditJobPage;
