import { BaseRepository } from './BaseRepository';
import { QueryOptions } from '../query/QueryOptions';
import { QueryResult } from '../query/QueryResult';
import { getRequestContext } from '../context/RequestContext';
import { ApiError } from '../responses/ApiError';

export abstract class TenantRepository<T, TQuery extends QueryOptions = QueryOptions> extends BaseRepository<T, TQuery> {
  
  protected applyTenantIsolation(where: any) {
    const ctx = getRequestContext();
    if (!ctx || !ctx.workspaceId) {
      throw ApiError.internal('Tenant isolation enforced but no workspace context available in RequestContext');
    }
    where.workspaceId = ctx.workspaceId;
    return where;
  }

  protected getTenantWhere(where: any = {}): any {
    return this.applyTenantIsolation(where);
  }

  override async findAll(
    query: TQuery,
    where: any = {},
    allowedSortFields: string[] = ['createdAt', 'updatedAt']
  ): Promise<QueryResult<T>> {
    this.applyTenantIsolation(where);
    return super.findAll(query, where, allowedSortFields);
  }

  override async findById(id: string, includeDeleted = false): Promise<T | null> {
    const where: any = { id };
    this.applyTenantIsolation(where);
    if (!includeDeleted) {
      where.deletedAt = null;
    }
    return this.model.findFirst({ where });
  }

  override async exists(id: string, includeDeleted = false): Promise<boolean> {
    const where: any = { id };
    this.applyTenantIsolation(where);
    if (!includeDeleted) {
      where.deletedAt = null;
    }
    const count = await this.model.count({ where });
    return count > 0;
  }

  override async count(where: any = {}): Promise<number> {
    this.applyTenantIsolation(where);
    return super.count(where);
  }

  override async softDelete(id: string, deletedBy: string): Promise<T> {
    const where: any = { id };
    this.applyTenantIsolation(where);
    // Instead of directly updating by id, we should ensure it exists under this tenant first
    const exists = await this.exists(id, true);
    if (!exists) throw ApiError.notFound('Record not found in this workspace');
    return super.softDelete(id, deletedBy);
  }

  override async restore(id: string, updatedBy: string): Promise<T> {
    const where: any = { id };
    this.applyTenantIsolation(where);
    const exists = await this.exists(id, true);
    if (!exists) throw ApiError.notFound('Record not found in this workspace');
    return super.restore(id, updatedBy);
  }

  override async create(data: any): Promise<T> {
    // Inject workspaceId into the data payload
    const ctx = getRequestContext();
    if (!ctx || !ctx.workspaceId) {
      throw ApiError.internal('Tenant isolation enforced but no workspace context available in RequestContext');
    }
    data.workspaceId = ctx.workspaceId;
    return super.create(data);
  }

  override async update(id: string, data: any): Promise<T> {
    const where: any = { id };
    this.applyTenantIsolation(where);
    const exists = await this.exists(id, true);
    if (!exists) throw ApiError.notFound('Record not found in this workspace');
    return super.update(id, data);
  }

  override async delete(id: string): Promise<T> {
    const where: any = { id };
    this.applyTenantIsolation(where);
    const exists = await this.exists(id, true);
    if (!exists) throw ApiError.notFound('Record not found in this workspace');
    return super.delete(id);
  }
}
