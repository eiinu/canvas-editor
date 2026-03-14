import { describe, expect, it } from 'vitest';
import { bootstrapEditorCore } from './index.js';

describe('editor-core scaffold', () => {
  it('returns bootstrap metadata', () => {
    expect(bootstrapEditorCore().initialized).toBe(true);
  });
});
