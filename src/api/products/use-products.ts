import { createInfiniteQuery } from 'react-query-kit';

import { client } from '../common';
import type { FetchProductsResponse } from './types';

type Variables = {
  items: number;
};

export const useProducts = createInfiniteQuery({
  queryKey: ['products'],
  fetcher: async (
    variables: Variables,
    { pageParam = 1 }
  ): Promise<FetchProductsResponse> => {
    const { data } = await client.get<FetchProductsResponse>(
      `/products?page=${pageParam}&items=${variables.items}`
    );
    return data;
  },
  getNextPageParam: (lastPage) => {
    const nextPageMatch = lastPage.pagination.next_url.match(/page=(\d+)/);
    return nextPageMatch ? parseInt(nextPageMatch[1], 10) : undefined;
  },
  initialPageParam: 1,
});
