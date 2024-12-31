export type Product = {
  name: string;
  id: number;
  underline: string;
  description: string | null;
  image: string;
  is_self_scale_item: boolean;
  is_available_in_all_stores: boolean;
  department_name: string;
  updated: string;
  age_limit: number | null;
  info: string;
  temperature_zone: string | null;
  is_weight_item: boolean;
  is_batch_item: boolean;
  department_id: number;
};

export type PriceDetails = {
  price: number;
  is_advertised: boolean;
  is_campaign: boolean;
  compare_unit_price: number;
  compare_unit: string;
};

export type PriceOnDate = {
  [date: string]: PriceDetails;
};

export type ProductPriceHistory = {
  product_id: number;
  avg_price: number;
  current_price: number;
  lowest_price: number;
  price_on_date: PriceOnDate;
};

export type Department = {
  name: string;
  id: number;
};

export type Deal = {
  product_id: number;
  product_name: string;
  image: string;
  advertised_price: number;
  regular_price: number;
  difference_amount: number;
  difference_percent: number;
};

export type DiscountDepartment = {
  avg_price: number;
  min_price: number;
  max_price: number;
  avg_difference_amount: number;
  avg_difference_percent: number;
  department_name: string;
  department_id: number;
  deals: Deal[];
};

export type PriceMetrics = {
  department_name: string;
  date: string;
  median_price: number;
  min_price: number;
  max_price: number;
  price_volatility: number; // Can be 0 if there's no volatility
};

export type PriceMetricsResponse = {
  department_id: number;
  department_name: string;
  price_on_date: PriceMetrics[];
};
