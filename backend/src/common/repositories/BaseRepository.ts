import { QueryOptions } from '../query/QueryOptions';
import { QueryResult } from '../query/QueryResult';
import { QueryHelper } from '../query/QueryHelper';

export abstract class BaseRepository<T, TQuery extends QueryOptions = QueryOptions> {
  constructor(protected readonly model: any) {}

  async findAll(
    query: TQuery,
    where: any = {},
    allowedSortFields: string[] = ['createdAt', 'updatedAt']
  ): Promise<QueryResult<T>> {
    const { skip, take } = QueryHelper.getPagination(query);
    const orderBy = QueryHelper.getSortParams(query, allowedSortFields);

    const includeDeleted = query.includeDeleted || false;
    if (!includeDeleted) {
      where.deletedAt = null;
    }

    const [total, data] = await Promise.all([
      this.model.count({ where }),
      this.model.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
    ]);

    return QueryHelper.formatResult(data, total, query);
  }

  async findById(id: string, includeDeleted = false): Promise<T | null> {
    const where: any = { id };
    if (!includeDeleted) {
      where.deletedAt = null;
    }
    return this.model.findFirst({ where });
  }

  async exists(id: string, includeDeleted = false): Promise<boolean> {
    const where: any = { id };
    if (!includeDeleted) {
      where.deletedAt = null;
    }
    const count = await this.model.count({ where });
    return count > 0;
  }

  async count(where: any = {}): Promise<number> {
    return this.model.count({ where });
  }

  async softDelete(id: string, deletedBy: string): Promise<T> {
    return this.model.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy,
      },
    });
  }

  async restore(id: string, updatedBy: string): Promise<T> {
    return this.model.update({
      where: { id },
      data: {
        deletedAt: null,
        deletedBy: null,
        updatedBy,
      },
    });
  }

  async create(data: any): Promise<T> {
    return this.model.create({ data });
  }

  async update(id: string, data: any): Promise<T> {
    return this.model.update({ where: { id }, data });
  }

  async delete(id: string): Promise<T> {
    return this.model.delete({ where: { id } });
  }
}
