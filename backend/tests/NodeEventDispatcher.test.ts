import { describe, it, expect, vi } from 'vitest';
import { NodeEventDispatcher } from '../src/common/events/NodeEventDispatcher';
import { DomainEvent } from '../src/common/events/DomainEvent';

describe('NodeEventDispatcher', () => {
  it('should emit and listen to events', async () => {
    const dispatcher = new NodeEventDispatcher();
    const mockListener = vi.fn();
    
    dispatcher.subscribe('test.event', mockListener);
    
    const event: DomainEvent = {
      id: '123',
      name: 'test.event',
      occurredAt: new Date(),
      payload: { data: 'test' }
    };
    
    dispatcher.emit(event);
    
    // Allow macro task queue to drain since subscribe uses async
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(mockListener).toHaveBeenCalledWith(event);
  });

  it('should isolate failing listeners so they do not crash the app or other listeners', async () => {
    const dispatcher = new NodeEventDispatcher();
    const failingListener = vi.fn().mockRejectedValue(new Error('Listener failed'));
    const successListener = vi.fn().mockResolvedValue(true);
    
    dispatcher.subscribe('test.event', failingListener);
    dispatcher.subscribe('test.event', successListener);
    
    const event: DomainEvent = {
      id: '123',
      name: 'test.event',
      occurredAt: new Date(),
      payload: { data: 'test' }
    };
    
    // This should not throw
    dispatcher.emit(event);
    
    // Allow macro task queue to drain
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(failingListener).toHaveBeenCalled();
    expect(successListener).toHaveBeenCalled();
  });
});
