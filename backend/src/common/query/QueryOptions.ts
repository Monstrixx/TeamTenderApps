export interface QueryOptions<TFilters = Record<string, unknown>> {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  keyword?: string;
  includeDeleted?: boolean;
  filters?: TFilters;
}
