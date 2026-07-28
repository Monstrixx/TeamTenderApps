import { ArtifactStorageAPI } from "../sandbox/ArtifactStorageAPI";

export interface IRuntimeAPI {}
export interface IKnowledgeAPI {}
export interface IMeshAPI {}
export interface IEventAPI {
    publish(event: string, payload: any): void;
}
export interface ILogger {
    info(msg: string): void;
    error(msg: string): void;
}
export interface ITelemetryService {
    record(metric: string, value: number): void;
}

export interface PluginContext {
    workspaceId: string;
    userId: string;
    permissions: string[];
    apis: {
        runtime: IRuntimeAPI;
        knowledge: IKnowledgeAPI;
        mesh: IMeshAPI;
        events: IEventAPI;
        artifacts: ArtifactStorageAPI;
    };
    logger: ILogger;
    telemetry: ITelemetryService;
}
