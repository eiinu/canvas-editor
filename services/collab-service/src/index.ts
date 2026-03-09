import type { OperationEnvelope } from '@canvas-editor/shared-protocol';

export interface CollabServiceContext {
  serviceName: string;
  acceptedOps: string[];
}

export const bootstrapCollabService = (
  _initialOps: OperationEnvelope[] = []
): CollabServiceContext => ({
  serviceName: '@canvas-editor/collab-service',
  acceptedOps: ['insert_text', 'delete_range', 'set_mark']
});

if (process.env.NODE_ENV !== 'test') {
  const context = bootstrapCollabService();
  console.log(`[boot] ${context.serviceName} ready`);
}
