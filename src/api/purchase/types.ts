import type { CartItem } from '../cart/types';
import type { Pagination } from '../types';

type ShippingAdress = {
  id: number;
  city: string;
  country: string;
  line_1: string;
  line_2: string;
  postal_code: string;
  state: string;
};

export type Purchase = {
  id: number;
  totalPrice: string;
  line_items: CartItem[];
  shippingAdrress: ShippingAdress;
};

export type PurchasesResponse = {
  data: Purchase[];
  pagination: Pagination;
};
