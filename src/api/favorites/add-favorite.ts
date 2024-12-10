import type { UseMutationOptions } from '@tanstack/react-query';

import { client, parseAxiosError, useBaseMutation } from '../common';
import type { FavoriteProduct } from './types';

export const addFavorite = async (id: number): Promise<FavoriteProduct> => {
  try {
    const { data } = await client.post(`/products/${id}/favorite`, {});
    return data;
  } catch (error) {
    throw parseAxiosError(error);
  }
};

export const useAddFavorite = (
  props: UseMutationOptions<FavoriteProduct, string, number, any>
) =>
  useBaseMutation<number, FavoriteProduct>({
    mutationKey: ['addFavorite'],
    mutationFn: addFavorite,
    ...props,
  });
