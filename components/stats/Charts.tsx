"use client";

import { getChartsData } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import BarChartContainer from "./BarChartContainer";
import AreaChartContainer from "./AreaChartContainer";

function Charts() {
  const { data: chartsData } = useQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsData(),
  });

  if (!chartsData || chartsData.length === 0) {
    return null;
  }

  return (
    <>
      <h1 className="text-xl font-medium capitalize tracking-wide text-center">{`monthly applications (last 6 months)`}</h1>
      <Tabs defaultValue="area" className="mt-4 w-full text-center">
        <TabsList>
          <TabsTrigger value="area">Area Chart</TabsTrigger>
          <TabsTrigger value="bar">Bar Chart</TabsTrigger>
        </TabsList>
        <TabsContent value="area" className="mt-6">
          <AreaChartContainer chartData={chartsData} />
        </TabsContent>
        <TabsContent value="bar" className="mt-6">
          <BarChartContainer chartData={chartsData} />
        </TabsContent>
      </Tabs>
    </>
  );
}
export default Charts;
