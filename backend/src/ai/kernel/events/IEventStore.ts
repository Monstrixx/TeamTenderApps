import { CognitiveEvent } from './CognitiveEvent';

export interface IEventStore {
  /**
   * Source of truth, stores event as immutable append-only record.
   */
  append(event: CognitiveEvent): Promise<void>;
  
  /**
   * Fetches events for an aggregate, used by Replay Engine.
   */
  readStream(aggregateId: string, aggregateType: string, fromVersion?: number): Promise<CognitiveEvent[]>;
  
  /**
   * Support for Projection Builders fetching global stream chunks.
   */
  readAll(fromTimestamp: Date, limit: number): Promise<CognitiveEvent[]>;
}
