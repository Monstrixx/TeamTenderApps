import { EventEmitter } from 'events';
import { DomainEvent } from './DomainEvent';
import { DomainEventDispatcher } from './DomainEventDispatcher';
import { logger } from '../../utils/logger';

export class NodeEventDispatcher implements DomainEventDispatcher {
  private emitter = new EventEmitter();

  emit(event: DomainEvent): void {
    this.emitter.emit(event.name, event);
  }

  subscribe(eventName: string, listener: (event: DomainEvent) => Promise<void> | void): void {
    this.emitter.on(eventName, async (event: DomainEvent) => {
      try {
        await listener(event);
      } catch (error) {
        logger.error({ err: error, event }, `Error in listener for event ${eventName}`);
        // The exception is caught here so it won't crash the Node process 
        // or interrupt other listeners attached to the same event or the main thread.
      }
    });
  }
}

// Export a singleton instance to be used across the application
export const eventDispatcher = new NodeEventDispatcher();
