import Charts from "@/components/stats/Charts";
import KPIContainer from "@/components/stats/KPIContainer";
import { getChartsData, getJobStats } from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

async function StatsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["stats"],
    queryFn: () => getJobStats(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsData(),
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <section>
          <KPIContainer />
        </section>
        <section className="mt-8">
          <Charts />
        </section>
      </HydrationBoundary>
    </main>
  );
}
export default StatsPage;
