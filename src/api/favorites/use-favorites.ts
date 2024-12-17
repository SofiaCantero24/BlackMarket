import { createInfiniteQuery } from 'react-query-kit';

import { client, DEFAULT_PAGE_PARAMS } from '../common';
import { API_CONSTS, QUERY_KEYS } from '../consts';
import type { FavoriteProductsResponse } from './types';

type Variables = {
  items: number;
};

export const useFavorites = createInfiniteQuery({
  queryKey: QUERY_KEYS.FAVORITES,
  fetcher: async (
    variables: Variables,
    { pageParam = API_CONSTS.INITIAL_PAGE }
  ): Promise<FavoriteProductsResponse> => {
    const { data } = await client.get<FavoriteProductsResponse>(
      '/products/favorites',
      {
        params: {
          page: pageParam,
          items: variables.items,
        },
      }
    );
    return data;
  },
  ...DEFAULT_PAGE_PARAMS,
});
