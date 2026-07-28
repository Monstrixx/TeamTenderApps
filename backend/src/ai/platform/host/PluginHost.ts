import { PluginContainer } from "../sandbox/PluginContainer";
import { IPluginRuntimeProcess } from "../runtime/PluginRuntime";
import { PluginContext } from "./PluginContext";

export class PluginHost {
    private plugins: Map<string, { process: IPluginRuntimeProcess; container: PluginContainer }> = new Map();

    public async mount(pluginId: string, process: IPluginRuntimeProcess, container: PluginContainer, context: PluginContext): Promise<void> {
        this.plugins.set(pluginId, { process, container });
        await process.start(context);
    }

    public async unmount(pluginId: string): Promise<void> {
        const plugin = this.plugins.get(pluginId);
        if (plugin) {
            await plugin.process.stop();
            this.plugins.delete(pluginId);
        }
    }

    public getHealth(pluginId: string): string {
        return this.plugins.get(pluginId)?.process.health() || "NOT_FOUND";
    }
}
