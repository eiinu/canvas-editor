import type { OperationEnvelope } from '@eiinu/editor-protocol';

export interface EditorCoreBootstrapResult {
  initialized: true;
  acceptedOperationTypes: string[];
}

export const bootstrapEditorCore = (
  _operations: OperationEnvelope[] = []
): EditorCoreBootstrapResult => {
  return {
    initialized: true,
    acceptedOperationTypes: ['insert_text', 'delete_range', 'set_mark']
  };
};
