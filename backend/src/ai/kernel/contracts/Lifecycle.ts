export enum KernelLifecycle {
  CREATED = "CREATED",
  INITIALIZING = "INITIALIZING",
  READY = "READY",
  DEGRADED = "DEGRADED",
  STOPPING = "STOPPING",
  STOPPED = "STOPPED"
}

export interface HealthAware {
  health(): Promise<{ status: string; details?: any }>;
  ready(): Promise<boolean>;
  shutdown(): Promise<void>;
}
