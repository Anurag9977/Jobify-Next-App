"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function JobsLoadingPage() {
  return (
    <main>
      <Card className="rounded-xl px-8 py-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
      </Card>
    </main>
  );
}
export default JobsLoadingPage;
