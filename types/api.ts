export type Product = {
  id: number;
  name: string;
  department: string;
  img: string;
};

export type ProductList = Product[];

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
