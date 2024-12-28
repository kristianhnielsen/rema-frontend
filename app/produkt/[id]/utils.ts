import { ProductPriceHistory } from "@/types/api";

export function getPriceEntries(priceHistory: ProductPriceHistory) {
  return Object.entries(priceHistory.price_on_date);
}

export function getDaysCampaignedInYearCount(
  priceHistory: ProductPriceHistory
): number {
  const priceEntries = getPriceEntries(priceHistory);
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  return priceEntries.filter(
    ([date, details]) => new Date(date) >= oneYearAgo && details.is_campaign
  ).length;
}
