import { DomainEvent } from '../common/events/DomainEvent';
import { DomainEventListener } from '../common/events/EventListener';
import { DomainEventDispatcher } from '../common/events/DomainEventDispatcher';
import { EventNames } from '../common/events/EventNames';

export class NotificationListener implements DomainEventListener {
  register(dispatcher: DomainEventDispatcher): void {
    Object.values(EventNames).forEach((eventName) => {
      dispatcher.subscribe(eventName, this.handleNotificationEvent.bind(this));
    });
  }

  private async handleNotificationEvent(event: DomainEvent): Promise<void> {
    // Placeholder for actual notification logic (e.g. email, WebSocket)
    console.log(`[NotificationListener] Processing event: ${event.name}`);
  }
}
