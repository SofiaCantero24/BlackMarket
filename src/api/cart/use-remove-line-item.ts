import type { UseMutationOptions } from '@tanstack/react-query';

import { client } from '../common';
import { parseAxiosError, useBaseMutation } from '../common/utils';

type Variables = {
  itemId: number;
};

export const removeShoppingCartItem = async ({
  itemId,
}: Variables): Promise<null> => {
  try {
    const { data } = await client.delete(`/shopping_cart/line_items/${itemId}`);
    return data;
  } catch (error) {
    throw parseAxiosError(error);
  }
};

export const useRemoveShoppingCartItem = (
  props: UseMutationOptions<null, string, Variables, any>
) =>
  useBaseMutation<Variables, null>({
    mutationKey: ['removeShoppingCartItem'],
    mutationFn: removeShoppingCartItem,
    ...props,
  });
