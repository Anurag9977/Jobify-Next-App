"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function StatsLoadingPage() {
  return (
    <main>
      <section className="grid lg:grid-cols-3 gap-x-6 gap-y-4">
        <LoadingContent />
        <LoadingContent />
        <LoadingContent />
      </section>
      <section className="mt-8 flex flex-col gap-y-4">
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
        <Skeleton className="h-64" />
      </section>
    </main>
  );
}
export default StatsLoadingPage;

function LoadingContent() {
  return (
    <Card>
      <CardHeader className="px-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-full" />
        </div>
      </CardHeader>
      <CardContent className="px-4">
        <Skeleton className="h-12 w-12 rounded-full" />
      </CardContent>
    </Card>
  );
}
