export interface OperationEnvelope {
  opId: string;
  docId: string;
  baseRevision: number;
  payload: unknown;
}

export interface PresenceState {
  userId: string;
  color: string;
  cursor: { x: number; y: number };
}
