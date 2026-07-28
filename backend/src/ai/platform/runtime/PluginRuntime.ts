import { PluginContext } from "../host/PluginContext";
import { PluginHealthState } from "../models/PluginState";

export interface IPluginRuntimeProcess {
    start(context: PluginContext): Promise<void>;
    stop(): Promise<void>;
    suspend(): Promise<void>;
    resume(): Promise<void>;
    health(): PluginHealthState;
}

export class PluginRuntimeEngine {
    public executeCapability(pluginId: string, capabilityId: string, payload: any): Promise<any> {
        // Platform executes capability
        return Promise.resolve({ success: true, result: "Executed in Plugin Sandbox" });
    }
}
