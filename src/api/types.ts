export type Product = {
  id: number;
  title: string;
  description: string;
  state: string;
  stock: number;
  is_favorite: boolean;
  unit_price: string;
  pictures: string[];
  category: Category;
  subcategories: Category[];
};

export type Category = {
  id: number;
  name: string;
  description: string;
};

export type PaginateQuery<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

export type Pagination = {
  first_url: string;
  prev_url: string;
  page_url: string;
  next_url: string;
  last_url: string;
  count: number;
  page: number;
  items: number;
};
