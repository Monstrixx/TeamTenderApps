import { DomainEventDispatcher } from './DomainEventDispatcher';

export interface DomainEventListener {
  register(dispatcher: DomainEventDispatcher): void;
  dispose?(): void | Promise<void>;
}
