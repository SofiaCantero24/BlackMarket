import type { Pagination, Product } from '../types';

export type FavoriteProduct = {
  id: number;
  product: Product;
};

export type FavoriteProductsResponse = {
  data: FavoriteProduct[];
  pagination: Pagination;
};
