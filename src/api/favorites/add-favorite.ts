import { type UseMutationOptions, useQueryClient } from '@tanstack/react-query';

import { showErrorMessage } from '@/ui';

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
) => {
  const queryClient = useQueryClient();

  return useBaseMutation<number, FavoriteProduct>({
    mutationKey: ['addFavorite'],
    mutationFn: addFavorite,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      props?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      showErrorMessage('Something went wrong');
      props?.onError?.(error, variables, context);
    },
    ...props,
  });
};
