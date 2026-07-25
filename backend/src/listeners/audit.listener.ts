import { DomainEvent } from '../common/events/DomainEvent';
import { AuditService } from '../services/AuditService';
import { DomainEventListener } from '../common/events/EventListener';
import { DomainEventDispatcher } from '../common/events/DomainEventDispatcher';
import { EventNames } from '../common/events/EventNames';
import { AuditLevel } from '@prisma/client';

export class AuditListener implements DomainEventListener {
  register(dispatcher: DomainEventDispatcher): void {
    Object.values(EventNames).forEach((eventName) => {
      dispatcher.subscribe(eventName, this.handleAuditEvent.bind(this));
    });
  }

  private getAuditLevel(eventName: string): AuditLevel {
    switch (eventName) {
      case EventNames.WORKSPACE_DELETED:
      case EventNames.COMPANY_DELETED:
        return AuditLevel.WARNING;
      default:
        // By default, DomainEvents are INFO, except when explicitly matched (e.g. security events)
        if (eventName.startsWith('login.') || eventName.startsWith('permission.')) {
          return AuditLevel.SECURITY;
        }
        if (eventName.startsWith('validation.')) {
          return AuditLevel.WARNING;
        }
        if (eventName.startsWith('system.') || eventName.startsWith('migration.')) {
          return AuditLevel.SYSTEM;
        }
        return AuditLevel.INFO;
    }
  }

  private async handleAuditEvent(event: DomainEvent): Promise<void> {
    const level = this.getAuditLevel(event.name);

    // Extract basic properties. The AuditService automatically fills missing context like ipAddress.
    await AuditService.log({
      event: event.name,
      level,
      entityType: event.name.split('.')[0] || 'unknown',
      entityId: (event.payload as any)?.id, // Try to infer ID from payload
      payload: event.payload,
      userId: event.userId,
      workspaceId: event.workspaceId,
      requestId: event.requestId,
      correlationId: event.correlationId,
    });
  }
}
