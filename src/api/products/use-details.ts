import { useQuery } from '@tanstack/react-query';

import { client, parseAxiosError } from '../common';
import { QUERY_KEYS } from '../consts';
import type { Product } from './types';
export const getItemDetails = async (id: number): Promise<Product> => {
  try {
    const { data } = await client.get(`products/${id}`);
    return data;
  } catch (error) {
    throw parseAxiosError(error);
  }
};
export const useGetItemDetails = (id: number) =>
  useQuery({
    queryKey: QUERY_KEYS.ITEM_DETAILS,
    queryFn: () => getItemDetails(id),
  });
