import { createInfiniteQuery } from 'react-query-kit';

import { client } from '../common';
import { APICONSTS, QUERY_KEYS } from '../consts';
import type { FetchProductsResponse } from './types';

type Variables = {
  items: number;
  text: string;
};

export const useProducts = createInfiniteQuery({
  queryKey: QUERY_KEYS.PRODUCTS,
  fetcher: async (
    variables: Variables,
    { pageParam = APICONSTS.INITIAL_PAGE }
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
  getNextPageParam: (lastPage) => {
    const nextUrl = lastPage.pagination.next_url;
    const queryString = nextUrl.split('?')[1];
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get('page');
    return page ? parseInt(page, 10) : undefined;
  },
  initialPageParam: 1,
});
