import { createInfiniteQuery } from 'react-query-kit';

import { client, DEFAULT_PAGE_PARAMS } from '../common';
import { API_CONSTS, QUERY_KEYS } from '../consts';
import type { FetchProductsResponse } from './types';

type Variables = {
  items: number;
  text: string;
};

export const useProducts = createInfiniteQuery({
  queryKey: QUERY_KEYS.PRODUCTS,
  fetcher: async (
    variables: Variables,
    { pageParam = API_CONSTS.INITIAL_PAGE }
  ): Promise<FetchProductsResponse> => {
    const { data } = await client.get<FetchProductsResponse>('/products', {
      params: {
        page: pageParam,
        items: variables.items,
        text: variables.text,
      },
    });
    return data;
  },
  ...DEFAULT_PAGE_PARAMS,
});
