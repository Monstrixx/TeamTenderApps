import { PluginManifestV2 } from "../models/PluginManifestV2";

export class PluginRegistry {
    private registry: Map<string, PluginManifestV2> = new Map();

    public register(manifest: PluginManifestV2): void {
        this.registry.set(manifest.id, manifest);
    }

    public get(pluginId: string): PluginManifestV2 | undefined {
        return this.registry.get(pluginId);
    }

    public listAll(): PluginManifestV2[] {
        return Array.from(this.registry.values());
    }
}
