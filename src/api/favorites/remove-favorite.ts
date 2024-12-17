import { type UseMutationOptions, useQueryClient } from '@tanstack/react-query';

import { showErrorMessage } from '@/ui';

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
) => {
  const queryClient = useQueryClient();

  return useBaseMutation<number, null>({
    mutationKey: ['removeFavorite'],
    mutationFn: removeFavorite,
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
