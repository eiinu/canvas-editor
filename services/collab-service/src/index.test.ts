import { describe, expect, it } from 'vitest';
import { bootstrapCollabService } from './index.js';

describe('collab-service scaffold', () => {
  it('returns bootstrap context', () => {
    expect(bootstrapCollabService().serviceName).toContain('@eiinu/editor-collab');
  });
});
