"use client";
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

const getMonthlyTicks = (
  chartData: {
    date: string;
    price: number;
  }[]
) => {
  const uniqueMonths = new Map();
  chartData.forEach((item) => {
    const monthKey = new Date(item.date).toISOString().slice(0, 7); // Format as YYYY-MM
    if (!uniqueMonths.has(monthKey)) {
      uniqueMonths.set(monthKey, item.date); // Save the original date
    }
  });
  return Array.from(uniqueMonths.values());
};

export default function ProductCard({
  chartData,
}: {
  chartData: {
    date: string;
    price: number;
  }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Price History</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            price: {
              label: "Price",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="min-h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                ticks={getMonthlyTicks(chartData)}
                tickFormatter={(value) =>
                  new Date(value).toLocaleString("default", {
                    month: "short",
                    year: "2-digit",
                  })
                }
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="var(--color-price)"
                name="Price"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
