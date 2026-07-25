import { DomainEvent } from '../common/events/DomainEvent';
import { DomainEventListener } from '../common/events/EventListener';
import { DomainEventDispatcher } from '../common/events/DomainEventDispatcher';
import { EventNames } from '../common/events/EventNames';

export class ActivityListener implements DomainEventListener {
  register(dispatcher: DomainEventDispatcher): void {
    Object.values(EventNames).forEach((eventName) => {
      dispatcher.subscribe(eventName, this.handleActivityEvent.bind(this));
    });
  }

  private async handleActivityEvent(event: DomainEvent): Promise<void> {
    // Placeholder for activity timeline logic
    console.log(`[ActivityListener] Recording timeline activity for: ${event.name}`);
  }
}
