import { createInfiniteQuery } from 'react-query-kit';

import { client } from '../common';
import type { FetchedShoppingCartResponse } from './types';

type Variables = {
  items: number;
};

export const useShoppingCart = createInfiniteQuery({
  queryKey: ['shopping_cart'],
  fetcher: async (
    variables: Variables,
    { pageParam = 1 }
  ): Promise<FetchedShoppingCartResponse> => {
    const { data } = await client.get<FetchedShoppingCartResponse>(
      `/shopping_cart?page=${pageParam}&items=${variables.items}`
    );
    return data;
  },
  getNextPageParam: (lastPage) => {
    const nextPageMatch = lastPage.pagination.next_url.match(/page=(\d+)/);
    return nextPageMatch ? parseInt(nextPageMatch[1], 10) : undefined;
  },
  initialPageParam: 1,
});
