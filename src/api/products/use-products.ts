import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { FetchProductsResponse } from './types';

type Response = FetchProductsResponse;

export const useProducts = createQuery<
  Response,
  { page: number; items: number },
  AxiosError
>({
  queryKey: ['products'],
  fetcher: async ({ page, items }) => {
    const { data } = await client.get(`products?page=${page}&items=${items}`);
    return data;
  },
});
