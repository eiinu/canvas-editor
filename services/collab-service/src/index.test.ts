import { describe, expect, it } from 'vitest';
import { bootstrapCollabService } from './index';

describe('collab-service scaffold', () => {
  it('returns bootstrap context', () => {
    expect(bootstrapCollabService().serviceName).toContain('collab-service');
  });
});
