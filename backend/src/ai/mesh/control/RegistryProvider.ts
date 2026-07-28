export interface RegistryProvider<T> {
  register(item: T): void;
  resolve(id: string): T | undefined;
  remove(id: string): void;
  
  // Hot reload capabilities
  reload(): Promise<void>;
  refresh(): Promise<void>;
}
