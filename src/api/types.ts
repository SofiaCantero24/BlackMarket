export type PaginateQuery<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

export type Pagination = {
  first_url: string;
  prev_url: string;
  page_url: string;
  next_url: string;
  last_url: string;
  count: number;
  page: number;
  items: number;
};
