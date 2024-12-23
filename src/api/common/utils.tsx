import type { UseMutationOptions } from '@tanstack/react-query';
import {
  type GetNextPageParamFunction,
  type GetPreviousPageParamFunction,
  useMutation,
} from '@tanstack/react-query';

import { API_CONSTS } from '../consts';
import type { PaginateQuery } from '../types';

type KeyParams = {
  [key: string]: any;
};
export const DEFAULT_LIMIT = 10;

export function getQueryKey<T extends KeyParams>(key: string, params?: T) {
  return [key, ...(params ? [params] : [])];
}

// for infinite query pages  to flatList data
export function normalizePages<T>(pages?: PaginateQuery<T>[]): T[] {
  return pages
    ? pages.reduce((prev: T[], current) => [...prev, ...current.results], [])
    : [];
}

// a function that accept a url and return params as an object
export function getUrlParameters(
  url: string | null
): { [k: string]: string } | null {
  if (url === null) {
    return null;
  }
  const urlObj = new URL(url);
  const params: { [key: string]: string } = {};
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

export const getPreviousPageParam: GetNextPageParamFunction<
  unknown,
  PaginateQuery<unknown>
> = (page) => getUrlParameters(page.previous)?.offset ?? null;

export const getNextPageParam: GetPreviousPageParamFunction<
  unknown,
  PaginateQuery<unknown>
> = (page) => getUrlParameters(page.next)?.offset ?? null;

type GenericObject = { [key: string]: any };

export const toCamelCase = (obj: GenericObject): GenericObject => {
  const newObj: GenericObject = {};
  for (const key in obj) {
    if (key.includes('_')) {
      const newKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      newObj[newKey] = obj[key];
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

export const toSnakeCase = (obj: GenericObject): GenericObject => {
  const newObj: GenericObject = {};
  for (const key in obj) {
    let newKey = key.match(/([A-Z])/g)
      ? key
          .match(/([A-Z])/g)!
          .reduce(
            (str, c) => str.replace(new RegExp(c), '_' + c.toLowerCase()),
            key
          )
      : key;
    newKey = newKey.substring(key.slice(0, 1).match(/([A-Z])/g) ? 1 : 0);
    newObj[newKey] = obj[key];
  }
  return newObj;
};

export const useBaseMutation = <TVariables, TData>(
  props: UseMutationOptions<TData, string, TVariables, any>
) => useMutation(props);

const DEFAULT_ERROR_MESSAGE = 'something went wrong';
const parseError = (data: any) => {
  const { error, errors } = data || {};
  if (error) {
    return error;
  }
  if (errors) {
    const { fullMessages, base } = errors;
    if (fullMessages) {
      const [firstMessage] = fullMessages;
      return firstMessage;
    } else if (base) {
      const [firstMessage] = base;
      return firstMessage;
    } else if (Array.isArray(errors)) {
      const [firstMessage] = errors;
      return firstMessage;
    } else {
      const errorKey = Object.keys(errors)[0];
      const error = errors[errorKey][0];
      return `${errorKey} ${error}`;
    }
  }
  return DEFAULT_ERROR_MESSAGE;
};
export const parseAxiosError = (error: any) => {
  if (error) {
    const { response } = error;
    if (!response) {
      return DEFAULT_ERROR_MESSAGE;
    }
    if (response.status === 500) {
      return DEFAULT_ERROR_MESSAGE;
    } else {
      return parseError(response?.data);
    }
  }
  return DEFAULT_ERROR_MESSAGE;
};

export const getPage = (lastPage: any): number | undefined => {
  const nextUrl = lastPage.pagination.next_url;
  const queryString = nextUrl.split('?')[1];
  const urlParams = new URLSearchParams(queryString);
  const page = urlParams.get('page');
  return page ? parseInt(page, 10) : undefined;
};

export const DEFAULT_PAGE_PARAMS = {
  getNextPageParam: (lastPage: any) => getPage(lastPage),
  initialPageParam: API_CONSTS.INITIAL_PAGE,
};
