import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { FetchProductsResponse } from './types';

type Response = FetchProductsResponse;
type Variables = {
  page: number;
  items: number;
};

export const useProducts = createQuery<Response, Variables, AxiosError>({
  queryKey: ['products', (variables: { page: number }) => variables.page],
  fetcher: async ({ page, items }) => {
    const { data } = await client.get(`products?page=${page}&items=${items}`);
    return data;
  },
});
