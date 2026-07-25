import { describe, it, expect } from 'vitest';
import { requestContextStore, getRequestContext, RequestContext } from '../../src/common/context/RequestContext';
import { v4 as uuidv4 } from 'uuid';

describe('RequestContext Isolation', () => {
  it('should isolate context between concurrent executions', async () => {
    const executeWithContext = async (id: string, delayMs: number) => {
      const context: RequestContext = {
        requestId: id,
        correlationId: id,
        startedAt: new Date(),
      };

      return new Promise<string>((resolve) => {
        requestContextStore.run(context, async () => {
          // Simulate some async work
          await new Promise(r => setTimeout(r, delayMs));
          
          const currentContext = getRequestContext();
          resolve(currentContext?.requestId || 'none');
        });
      });
    };

    const id1 = uuidv4();
    const id2 = uuidv4();

    // Run concurrently
    const [res1, res2] = await Promise.all([
      executeWithContext(id1, 50),
      executeWithContext(id2, 10),
    ]);

    expect(res1).toBe(id1);
    expect(res2).toBe(id2);
  });
});
