import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { FetchProductsResponse } from './types';

type Response = FetchProductsResponse;

export const useProducts = createQuery<Response, AxiosError>({
  queryKey: ['products'],
  fetcher: () => {
    return client.get(`products`).then((response) => response.data);
  },
});
