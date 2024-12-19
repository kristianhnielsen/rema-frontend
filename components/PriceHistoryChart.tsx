"use client";
import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Button } from "./ui/button";

interface ChartDataPoint {
  date: string;
  price: number;
}

type Duration = 1 | 3 | 6 | 12;

const formatDate = (date: string, duration: Duration): string => {
  const d = new Date(date);
  if (duration <= 3) {
    return d.toLocaleDateString("da-DK", { month: "short", day: "numeric" });
  } else if (duration <= 12) {
    return d.toLocaleDateString("da-DK", { month: "short", year: "2-digit" });
  } else {
    return d.toLocaleDateString("da-DK", { month: "short", year: "numeric" });
  }
};

interface CustomTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
  duration: Duration;
}

const CustomTick: React.FC<CustomTickProps> = ({ x, y, payload, duration }) => {
  if (payload == null || x == null || y == null) {
    return null;
  }
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#666"
        transform="rotate(-35)"
        className="text-xs sm:text-sm"
      >
        {formatDate(payload.value, duration)}
      </text>
    </g>
  );
};

const filterDataByDuration = (
  data: ChartDataPoint[],
  months: Duration
): ChartDataPoint[] => {
  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - months);
  return data.filter((item) => new Date(item.date) >= cutoffDate);
};

interface ProductCardProps {
  chartData: ChartDataPoint[];
}

export default function ProductCard({ chartData }: ProductCardProps) {
  const [selectedDuration, setSelectedDuration] = useState<Duration>(3);
  const filteredChartData = useMemo(
    () => filterDataByDuration(chartData, selectedDuration),
    [chartData, selectedDuration]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-center">Pris historik</CardTitle>
      </CardHeader>
      <CardContent className="p-0 md:p-6">
        <div className="flex justify-evenly md:justify-normal space-x-2 mb-4">
          {[1, 3, 6, 12].map((duration) => (
            <Button
              key={duration}
              variant={selectedDuration === duration ? "default" : "outline"}
              onClick={() => setSelectedDuration(duration as Duration)}
            >
              {duration === 12 ? "1 år" : `${duration} mnd`}
            </Button>
          ))}
        </div>
        <ChartContainer
          config={{
            price: {
              label: "Pris",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="min-h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                interval={"equidistantPreserveStart"}
                tick={<CustomTick duration={selectedDuration} />}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis tickFormatter={(value: number) => `${value.toFixed(2)}`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="var(--color-price)"
                name="Pris (kr)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
