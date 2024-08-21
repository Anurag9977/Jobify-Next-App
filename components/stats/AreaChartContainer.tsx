"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

type ChartData = Array<{
  month: string;
  offer: number;
  interview: number;
  declined: number;
}>;

function AreaChartContainer({ chartData }: { chartData: ChartData }) {
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
    <ChartContainer config={chartConfig} className="h-80 w-full mx-auto">
      <AreaChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Area
          dataKey="offer"
          type="monotone"
          fill="var(--color-offer)"
          fillOpacity={0.4}
          stroke="var(--color-offer)"
          stackId="a"
        />
        <Area
          dataKey="interview"
          type="monotone"
          fill="var(--color-interview)"
          fillOpacity={0.4}
          stroke="var(--color-interview)"
          stackId="a"
        />
        <Area
          dataKey="declined"
          type="monotone"
          fill="var(--color-declined)"
          fillOpacity={0.4}
          stroke="var(--color-declined)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
export default AreaChartContainer;
