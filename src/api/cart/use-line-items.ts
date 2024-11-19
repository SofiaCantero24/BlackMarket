import { createInfiniteQuery } from 'react-query-kit';

import { client } from '../common';
import { APICONSTS } from '../consts';
import type { FetchedShoppingCartResponse } from './types';

type Variables = {
  items: number;
};

export const useShoppingCart = createInfiniteQuery({
  queryKey: ['shopping_cart'],
  fetcher: async (
    variables: Variables,
    { pageParam = APICONSTS.INITIAL_PAGE }
  ): Promise<FetchedShoppingCartResponse> => {
    const { data } = await client.get<FetchedShoppingCartResponse>(
      '/shopping_cart',
      {
        params: {
          page: pageParam,
          items: variables.items,
        },
      }
    );
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
