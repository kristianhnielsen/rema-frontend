import { fetchDepartmentMetrics } from "@/lib/api";
import DepartmentPriceChart from "./DepartmentPriceChart";
import { PriceMetricsResponse } from "@/types/api";

export default async function DepartmentPage() {
  const departmentMetrics: PriceMetricsResponse[] =
    await fetchDepartmentMetrics();
  return <DepartmentPriceChart data={departmentMetrics} />;
}
