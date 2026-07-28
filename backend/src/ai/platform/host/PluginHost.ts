import { PluginContainer } from "../sandbox/PluginContainer";
import { IPluginRuntimeProcess, PluginLifecycleEvent, PluginRuntimeEngine, PluginRuntimeLifecycleState } from "../runtime/PluginRuntime";
import { PluginContext } from "./PluginContext";
import { PluginHealthState } from "../models/PluginState";

// ── PluginHost — generic plugin lifecycle manager, zero special-casing ────────
export class PluginHost {
    private plugins: Map<string, { process: IPluginRuntimeProcess; container: PluginContainer }> = new Map();
    private engine = new PluginRuntimeEngine();

    private emitEvent(type: PluginLifecycleEvent["type"], pluginId: string, state: PluginRuntimeLifecycleState): void {
        this.engine.emit({ type, pluginId, timestamp: new Date().toISOString(), lifecycleState: state });
    }

    public async mount(pluginId: string, process: IPluginRuntimeProcess, container: PluginContainer, context: PluginContext): Promise<void> {
        this.plugins.set(pluginId, { process, container });
        this.emitEvent("PluginMounted", pluginId, PluginRuntimeLifecycleState.LOADED);
        await process.start(context);
        this.emitEvent("PluginStarted", pluginId, PluginRuntimeLifecycleState.RUNNING);
    }

    public async unmount(pluginId: string): Promise<void> {
        const plugin = this.plugins.get(pluginId);
        if (plugin) {
            await plugin.process.stop();
            this.emitEvent("PluginStopped", pluginId, PluginRuntimeLifecycleState.STOPPED);
            this.plugins.delete(pluginId);
            this.emitEvent("PluginUnloaded", pluginId, PluginRuntimeLifecycleState.UNLOADED);
        }
    }

    public async suspend(pluginId: string): Promise<void> {
        const plugin = this.plugins.get(pluginId);
        if (plugin) {
            await plugin.process.suspend();
            this.emitEvent("PluginSuspended", pluginId, PluginRuntimeLifecycleState.SUSPENDED);
        }
    }

    public async resume(pluginId: string): Promise<void> {
        const plugin = this.plugins.get(pluginId);
        if (plugin) {
            await plugin.process.resume();
            this.emitEvent("PluginResumed", pluginId, PluginRuntimeLifecycleState.RESUMED);
        }
    }

    public getHealth(pluginId: string): PluginHealthState | "NOT_FOUND" {
        return this.plugins.get(pluginId)?.process.health() ?? "NOT_FOUND";
    }

    public isMounted(pluginId: string): boolean {
        return this.plugins.has(pluginId);
    }

    public getMountedCount(): number {
        return this.plugins.size;
    }

    public getEventLog(): PluginLifecycleEvent[] {
        return this.engine.getEventLog();
    }
}
