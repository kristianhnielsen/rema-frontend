import { ProductPriceHistory } from "@/types/api";

export function getPriceEntries(priceHistory: ProductPriceHistory) {
  return Object.entries(priceHistory.price_on_date);
}
export function getCurrentPrice(priceHistory: ProductPriceHistory): number {
  const priceEntries = getPriceEntries(priceHistory);
  return priceEntries[priceEntries.length - 1]?.[1].price;
}

export function getLowestPrice(priceHistory: ProductPriceHistory): number {
  const priceEntries = getPriceEntries(priceHistory);
  return Math.min(...priceEntries.map(([, details]) => details.price));
}

export function getAveragePrice(priceHistory: ProductPriceHistory): number {
  const priceEntries = getPriceEntries(priceHistory);
  const total = priceEntries.reduce(
    (sum, [, details]) => sum + details.price,
    0
  );
  return total / priceEntries.length;
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
