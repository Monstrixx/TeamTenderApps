import { CognitiveEvent, EventSubscriber } from './CognitiveEvent';

export interface IEventBus {
  /**
   * Dispatches the event to the transport medium.
   */
  publish(event: CognitiveEvent): Promise<void>;
  
  /**
   * Registers a subscriber to listen to the transport medium.
   */
  subscribe(subscriber: EventSubscriber): Promise<void>;
}
