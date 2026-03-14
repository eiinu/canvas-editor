import type { OperationEnvelope } from '@eiinu/editor-protocol';

export interface CollabServiceContext {
  serviceName: string;
  acceptedOps: string[];
}

export const bootstrapCollabService = (
  _initialOps: OperationEnvelope[] = []
): CollabServiceContext => ({
  serviceName: '@eiinu/editor-collab',
  acceptedOps: ['insert_text', 'delete_range', 'set_mark']
});

if (process.env.NODE_ENV !== 'test') {
  const context = bootstrapCollabService();
  console.log(`[boot] ${context.serviceName} ready`);
}
