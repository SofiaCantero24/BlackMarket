import type { Product } from '../products/types';

export type CartItem = {
  id: number;
  quantity: number;
  totalPriceInShoppingCart: string;
  product: Product;
};
