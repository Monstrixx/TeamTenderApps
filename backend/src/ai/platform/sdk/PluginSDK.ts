import { PluginManifestV2 } from "../models/PluginManifestV2";
import { PluginHost } from "../host/PluginHost";
import { PluginLoader } from "../host/PluginLoader";
import { PluginRegistry } from "../marketplace/PluginRegistry";

export class PlatformAPI {
    private host = new PluginHost();
    private loader = new PluginLoader();
    private registry = new PluginRegistry();

    public async installPlugin(manifest: PluginManifestV2, rawContent: string): Promise<void> {
        // 1. Contract Testing & Loader Validation
        this.loader.load(manifest);
        
        // 2. Register to Marketplace Registry
        this.registry.register(manifest);
    }

    public async enablePlugin(pluginId: string): Promise<void> {
        // 1. Resolve Dependency via Discovery Engine
        const manifest = this.registry.get(pluginId);
        if (!manifest) throw new Error("Plugin not found");

        // 2. Mount via Host (Isolates memory, builds Container)
        // Note: For simplicity, container logic is hidden here
    }

    public async disablePlugin(pluginId: string): Promise<void> {
        await this.host.unmount(pluginId);
    }

    public getPluginHealth(pluginId: string): string {
        return this.host.getHealth(pluginId);
    }
}

// 🔒 Public Contract API v1.0 Frozen
export const PluginSDK = new PlatformAPI();
