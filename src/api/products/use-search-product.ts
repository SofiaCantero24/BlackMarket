import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { FetchProductsResponse } from './types';

type Response = FetchProductsResponse;

export const useSearchProduct = createQuery<
  Response,
  { product: string },
  AxiosError
>({
  queryKey: ['searchProduct'],
  fetcher: async ({ product }) => {
    const { data } = await client.get(`products?text=${product}`);
    return data;
  },
});
