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
  fetcher: ({ page, items }) => {
    return client
      .get(`products?page=${page}&items=${items}`)
      .then((response) => response.data);
  },
});
