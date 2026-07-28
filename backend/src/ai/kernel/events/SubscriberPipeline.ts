import { CognitiveEvent, EventSubscriber } from './CognitiveEvent';

export class SubscriberPipeline {
  constructor(private subscriber: EventSubscriber) {}

  async process(rawPayload: string): Promise<void> {
    try {
      const event = this.deserialize(rawPayload);
      this.validate(event);
      this.authorize(event);
      
      await this.subscriber.handle(event);
      
      this.acknowledge(event);
    } catch (e) {
      this.handleFailure(e);
    }
  }

  private deserialize(raw: string): CognitiveEvent {
    return JSON.parse(raw) as CognitiveEvent;
  }

  private validate(event: CognitiveEvent) {
    // schema check
  }

  private authorize(event: CognitiveEvent) {
    // permission check
  }

  private acknowledge(event: CognitiveEvent) {
    // mark as complete
  }
  
  private handleFailure(error: any) {
    // handle retry / DLQ logic based on subscriber.retryPolicy
  }
}
