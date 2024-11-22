import type { Product } from '../products/types';
import type { Pagination } from '../types';

export type CartItem = {
  id: number;
  quantity: number;
  totalPriceInShoppingCart: string;
  product: Product;
};

export type ShoppingCart = {
  id: number;
  totalPrice: string;
  lineItems: CartItem[];
};

export type FetchedShoppingCartResponse = {
  id: number;
  totalPrice: string;
  lineItems: CartItem[];
  pagination: Pagination;
};
