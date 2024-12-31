"use client";

import { useState, useMemo, Dispatch, SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { PriceMetricsResponse } from "@/types/api";
import { DepartmentSelector } from "./DepartmentSelectorButton";
import { Button } from "@/components/ui/button";

interface PriceMetricsChartProps {
  data: PriceMetricsResponse[];
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
  "hsl(var(--chart-8))",
];

export default function PriceMetricsChart({ data }: PriceMetricsChartProps) {
  const [selectedMetric, setSelectedMetric] = useState<
    "median" | "min" | "max" | "volatility"
  >("median");
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([
    data[0].department_id,
  ]);

  const chartData = useMemo(() => {
    const allDates = new Set<string>();
    const departmentData: { [key: string]: { [key: string]: number } } = {};

    if (!data || data.length == 0) {
      return;
    }
    selectedDepartments.forEach((deptId) => {
      const dept = data.find((d) => d.department_id === deptId);
      if (dept) {
        Object.entries(dept.price_on_date).forEach(([date, metrics]) => {
          allDates.add(date);
          if (!departmentData[date]) {
            departmentData[date] = {};
          }

          if (selectedMetric == "volatility") {
            departmentData[date][`${dept.department_name}_${selectedMetric}`] =
              metrics[`price_volatility`];
          } else {
            departmentData[date][`${dept.department_name}_${selectedMetric}`] =
              metrics[`${selectedMetric}_price`];
          }
        });
      }
    });

    return Array.from(allDates)
      .map((date) => ({
        date: new Date(date).toLocaleDateString(),
        ...departmentData[date],
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data, selectedDepartments, selectedMetric]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Afdelingspris</CardTitle>
        <CardDescription>Pris data over tid</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-1 md:p-6">
        <div className="flex md:flex-row flex-col gap-4 md:items-center justify-between w-full">
          <DepartmentSelector
            departments={data}
            selectedDepartments={selectedDepartments}
            onSelectionChange={setSelectedDepartments}
          />
          <div className="grid grid-cols-2 md:flex flex-wrap gap-2">
            <MetricDataButton
              property="median"
              selectedMetric={selectedMetric}
              setSelectedMetric={setSelectedMetric}
            >
              Gennemsnit
            </MetricDataButton>
            <MetricDataButton
              property="volatility"
              selectedMetric={selectedMetric}
              setSelectedMetric={setSelectedMetric}
            >
              Volatilitet
            </MetricDataButton>
            <MetricDataButton
              property="min"
              selectedMetric={selectedMetric}
              setSelectedMetric={setSelectedMetric}
            >
              Min.
            </MetricDataButton>
            <MetricDataButton
              property="max"
              selectedMetric={selectedMetric}
              setSelectedMetric={setSelectedMetric}
            >
              Max.
            </MetricDataButton>
          </div>
        </div>
        {selectedMetric == "volatility" && (
          <p className="py-1 px-2 text-xs bg-blue-200 rounded-lg text-blue-500">
            Volatilitet: Jo tættere på 0 (nul), desto mere stabil
          </p>
        )}
        {!chartData && <NoDataChart />}
        {chartData && chartData.length > 0 ? (
          <ChartContainer
            config={{
              median: {
                label: "Gns. Pris",
                color: "hsl(var(--chart-1))",
              },
              min: {
                label: "Min. Pris",
                color: "hsl(var(--chart-2))",
              },
              max: {
                label: "Max. Pris",
                color: "hsl(var(--chart-3))",
              },
              volatility: {
                label: "Pris Volatilitet",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[400px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("da-DK", {
                      day: "numeric",
                      month: "short",
                    })
                  }
                />
                <YAxis tickFormatter={(value) => `${value.toFixed(2)} kr`} />
                <ChartTooltip content={<ChartTooltipContent />} />

                {selectedDepartments.map((deptId, index) => {
                  const dept = data.find((d) => d.department_id === deptId);
                  if (dept) {
                    return (
                      <Line
                        key={dept.department_id}
                        type="bump"
                        dataKey={`${dept.department_name}_${selectedMetric}`}
                        name={dept.department_name}
                        stroke={COLORS[index % COLORS.length]}
                        strokeWidth={2}
                        dot={false}
                      />
                    );
                  }
                  return null;
                })}
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <p className="text-center mt-4 text-muted-foreground">
            Venligst vælg en afdeling
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function MetricDataButton({
  property,
  selectedMetric,
  setSelectedMetric,
  children,
}: {
  property: "max" | "min" | "median" | "volatility";
  selectedMetric: "max" | "min" | "median" | "volatility";
  setSelectedMetric: Dispatch<
    SetStateAction<"max" | "min" | "median" | "volatility">
  >;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant={selectedMetric === property ? "default" : "secondary"}
      onClick={() => setSelectedMetric(property)}
    >
      {children}
    </Button>
  );
}

function NoDataChart() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Afdelings Pris Data</CardTitle>
        <CardDescription>Data ikke tilgængelig</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">
          Visning af data er ikke muligt.
        </p>
      </CardContent>
    </Card>
  );
}
