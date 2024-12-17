import { useQuery } from '@tanstack/react-query';

import { client, parseAxiosError } from '../common';
import { QUERY_KEYS } from '../consts';
import type { Category } from '../types';

type DetailProduct = {
  id: number;
  title: string;
  description: string;
  state: string;
  stock: number;
  isFavorite: boolean;
  unit_price: string;
  pictures: string[];
  category: Category;
  subcategories: Category[];
};

export const getItemDetails = async (id: number): Promise<DetailProduct> => {
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
