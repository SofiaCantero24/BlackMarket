import type { Pagination } from '../types';

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

type Category = {
  id: number;
  name: string;
  description: string;
};

export type FetchProductsResponse = {
  data: Product[];
  pagination: Pagination;
};
