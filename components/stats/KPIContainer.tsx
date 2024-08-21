"use client";

import { getJobStats } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import KPICard from "./KPICard";
import { CheckCheck, CircleX, Handshake } from "lucide-react";

function KPIContainer() {
  const { data: jobStats } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getJobStats(),
  });

  if (!jobStats) return null;

  return (
    <section className="grid lg:grid-cols-3 gap-x-6 gap-y-4">
      <KPICard
        title="offers received"
        icon={<Handshake />}
        count={jobStats.offer}
      />
      <KPICard
        title="interviews planned"
        icon={<CheckCheck />}
        count={jobStats.interview}
      />
      <KPICard
        title="declined applications"
        icon={<CircleX />}
        count={jobStats.declined}
      />
    </section>
  );
}
export default KPIContainer;
