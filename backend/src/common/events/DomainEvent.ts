export interface DomainEvent<T = unknown> {
  id: string;
  name: string;
  version: number;
  occurredAt: Date;
  requestId?: string;
  correlationId?: string;
  workspaceId?: string;
  userId?: string;
  source?: string;
  payload: T;
}
