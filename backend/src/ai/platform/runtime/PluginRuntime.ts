import { PluginContext } from "../host/PluginContext";
import { PluginHealthState } from "../models/PluginState";

// ── Full Plugin Lifecycle State Machine ──────────────────────────────────────
export enum PluginRuntimeLifecycleState {
    CREATED    = "CREATED",
    LOADED     = "LOADED",
    VALIDATED  = "VALIDATED",
    READY      = "READY",
    RUNNING    = "RUNNING",
    SUSPENDED  = "SUSPENDED",
    RESUMED    = "RESUMED",
    STOPPED    = "STOPPED",
    UNLOADED   = "UNLOADED"
}

// ── Platform Lifecycle Events ─────────────────────────────────────────────────
export type PluginLifecycleEventType =
    | "PluginLoaded"
    | "PluginValidated"
    | "PluginMounted"
    | "PluginStarted"
    | "PluginSuspended"
    | "PluginResumed"
    | "PluginStopped"
    | "PluginUnloaded";

export interface PluginLifecycleEvent {
    type: PluginLifecycleEventType;
    pluginId: string;
    timestamp: string;
    lifecycleState: PluginRuntimeLifecycleState;
}

// ── IPluginRuntimeProcess — the ONLY interface the Runtime knows about ────────
export interface IPluginRuntimeProcess {
    start(context: PluginContext): Promise<void>;
    stop(): Promise<void>;
    suspend(): Promise<void>;
    resume(): Promise<void>;
    health(): PluginHealthState;
    selftest(): Record<string, boolean>;
}

// ── PluginRuntimeEngine — generic executor, zero special-casing ───────────────
export class PluginRuntimeEngine {
    private eventLog: PluginLifecycleEvent[] = [];

    public emit(event: PluginLifecycleEvent): void {
        this.eventLog.push(event);
    }

    public getEventLog(): PluginLifecycleEvent[] {
        return [...this.eventLog];
    }

    public executeCapability(pluginId: string, capabilityId: string, payload: any): Promise<any> {
        return Promise.resolve({ success: true, result: `Capability '${capabilityId}' executed in Plugin Sandbox for '${pluginId}'` });
    }
}
