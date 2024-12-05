import { createInfiniteQuery } from 'react-query-kit';

import { client } from '../common';
import { API_CONSTS, QUERY_KEYS } from '../consts';
import type { PurchasesResponse } from './types';

type Variables = {
  items: number;
};

export const usePruchases = createInfiniteQuery({
  queryKey: QUERY_KEYS.PURCHASES,
  fetcher: async (
    variables: Variables,
    { pageParam = API_CONSTS.INITIAL_PAGE }
  ): Promise<PurchasesResponse> => {
    const { data } = await client.get<PurchasesResponse>('/orders', {
      params: {
        page: pageParam,
        items: variables.items,
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
