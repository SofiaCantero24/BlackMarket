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

export const patchShoppingCartItem = async ({
  itemId,
  quantity,
}: Variables): Promise<PostResponse> => {
  try {
    const { data } = await client.patch(`/shopping_cart/line_items/${itemId}`, {
      line_item: {
        quantity: quantity,
      },
    });
    return data;
  } catch (error) {
    throw parseAxiosError(error);
  }
};

export const usePatchShoppingCartItem = (
  props: UseMutationOptions<PostResponse, string, Variables, any>
) =>
  useBaseMutation<Variables, PostResponse>({
    mutationKey: ['patchShoppingCartItem'],
    mutationFn: patchShoppingCartItem,
    ...props,
  });
