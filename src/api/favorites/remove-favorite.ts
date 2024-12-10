import type { UseMutationOptions } from '@tanstack/react-query';

import { client } from '../common';
import { parseAxiosError, useBaseMutation } from '../common/utils';

export const removeFavorite = async (id: number): Promise<null> => {
  try {
    const { data } = await client.delete(`/products/${id}/favorite`);
    return data;
  } catch (error) {
    throw parseAxiosError(error);
  }
};

export const useRemoveFavorite = (
  props: UseMutationOptions<null, string, number, any>
) =>
  useBaseMutation<number, null>({
    mutationKey: ['removeFavorite'],
    mutationFn: removeFavorite,
    ...props,
  });
