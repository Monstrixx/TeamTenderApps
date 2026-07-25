import { DomainEvent } from './DomainEvent';

export interface DomainEventDispatcher {
  emit(event: DomainEvent): void;
  subscribe(eventName: string, listener: (event: DomainEvent) => Promise<void> | void): void;
}
