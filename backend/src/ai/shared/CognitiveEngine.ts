export interface ExecutionContext {
  workspaceId: string;
  companyId?: string;
  tenderId?: string;
  userId: string;
  permissions: string[];
  currentTime: Date;
  correlationId: string;
}

export interface CognitiveEngine<I, O> {
  execute(input: I, context: ExecutionContext): Promise<O>;
}
