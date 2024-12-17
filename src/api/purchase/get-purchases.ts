import { createInfiniteQuery } from 'react-query-kit';

import { client, DEFAULT_PAGE_PARAMS } from '../common';
import { API_CONSTS, QUERY_KEYS } from '../consts';
import type { PurchasesResponse } from './types';

type Variables = {
  items: number;
};

export const usePurchases = createInfiniteQuery({
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
  ...DEFAULT_PAGE_PARAMS,
});
