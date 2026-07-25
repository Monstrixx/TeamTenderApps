import { QueryOptions } from './QueryOptions';
import { QueryResult } from './QueryResult';

export class QueryHelper {
  /**
   * Translates common query options into Prisma skip/take pagination options.
   */
  static getPagination(options: QueryOptions) {
    const page = Math.max(1, options.page || 1);
    const limit = Math.max(1, options.limit || 20);
    const skip = (page - 1) * limit;

    return { skip, take: limit };
  }

  /**
   * Validates if a sort field is within the allowed whitelist.
   * Throws an error or returns a safe default if not valid.
   */
  static getSortParams(options: QueryOptions, allowedSortFields: string[], defaultSort = 'createdAt') {
    const sort = options.sort || defaultSort;
    const order = options.order || 'desc';

    if (!allowedSortFields.includes(sort)) {
      throw new Error(`Invalid sort field: ${sort}. Allowed fields: ${allowedSortFields.join(', ')}`);
    }

    return { [sort]: order };
  }

  /**
   * Constructs the standardized QueryResult from data and total count.
   */
  static formatResult<T>(data: T[], total: number, options: QueryOptions): QueryResult<T> {
    const page = Math.max(1, options.page || 1);
    const pageSize = Math.max(1, options.limit || 20);
    const totalPages = Math.ceil(total / pageSize);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    };
  }
}
