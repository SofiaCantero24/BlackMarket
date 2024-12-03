import type { UseMutationOptions } from '@tanstack/react-query';

import type { FetchedShoppingCartResponse } from '../cart/types';
import { client, parseAxiosError, useBaseMutation } from '../common';

type CreditCard = {
  card_number: string;
  exp_month: number;
  exp_year: number;
  cvc: string;
};

type ShippingAddress = {
  city: string;
  country: string;
  line_1: string;
  line_2: string;
  postal_code: string;
  state: string;
};

type OrderVariables = {
  credit_card: CreditCard;
  shipping_address: ShippingAddress;
};

type Order = {
  order: OrderVariables;
};

export const purchaseOrder = async (
  order: Order
): Promise<FetchedShoppingCartResponse> => {
  try {
    const { data } = await client.post(`/orders`, order);
    return data;
  } catch (error) {
    throw parseAxiosError(error);
  }
};

export const usePurchaseOrder = (
  props: UseMutationOptions<FetchedShoppingCartResponse, string, Order, any>
) =>
  useBaseMutation<Order, FetchedShoppingCartResponse>({
    mutationKey: ['purchaseOrder'],
    mutationFn: purchaseOrder,
    ...props,
  });
