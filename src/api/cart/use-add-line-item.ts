import type { UseMutationOptions } from '@tanstack/react-query';

import { client } from '../common';
import { parseAxiosError, useBaseMutation } from '../common/utils';
import type { CartItem } from './types';

type PostResponse = {
  item: CartItem;
};

type Variables = {
  itemId: number;
  quantity: number;
};

export const addShoppingCartItems = async ({
  itemId,
  quantity,
}: Variables): Promise<PostResponse> => {
  try {
    const { data } = await client.post(`/shopping_cart/line_items`, {
      line_item: {
        quantity: quantity,
        product_id: itemId,
      },
    });
    return data;
  } catch (error) {
    throw parseAxiosError(error);
  }
};

export const useAddShoppingCartItems = (
  props: UseMutationOptions<PostResponse, string, Variables, any>
) =>
  useBaseMutation<Variables, PostResponse>({
    mutationKey: ['addShoppingCartItems'],
    mutationFn: addShoppingCartItems,
    ...props,
  });
