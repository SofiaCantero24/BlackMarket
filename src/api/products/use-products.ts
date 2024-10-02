import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { FetchProductsResponse } from './types';

type Response = FetchProductsResponse;

export const useProducts = createQuery<Response, { page: number }, AxiosError>({
  queryKey: ['products'],
  fetcher: ({ page }) => {
    return client
      .get(`products?page=${page}&items=7`)
      .then((response) => response.data);
  },
});
