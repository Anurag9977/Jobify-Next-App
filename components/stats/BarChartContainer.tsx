"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

type ChartData = Array<{
  month: string;
  offer: number;
  interview: number;
  declined: number;
}>;

function BarChartContainer({ chartData }: { chartData: ChartData }) {
  const chartConfig = {
    offer: {
      label: "Offer",
      color: "hsl(var(--chart-2))",
    },
    interview: {
      label: "Interview",
      color: "hsl(var(--chart-3))",
    },
    declined: {
      label: "Declined",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-80 w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar
          dataKey="offer"
          fill="var(--color-offer)"
          fillOpacity={0.4}
          stroke="var(--color-offer)"
          radius={4}
        />
        <Bar
          dataKey="interview"
          fill="var(--color-interview)"
          fillOpacity={0.4}
          stroke="var(--color-interview)"
          radius={4}
        />
        <Bar
          dataKey="declined"
          fill="var(--color-declined)"
          fillOpacity={0.4}
          stroke="var(--color-declined)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
export default BarChartContainer;
