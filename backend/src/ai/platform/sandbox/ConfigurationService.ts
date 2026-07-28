export class ConfigurationService {
    private defaultConfig: Record<string, any> = {};
    private tenantConfig: Record<string, Record<string, any>> = {}; // tenantId -> config
    private runtimeOverride: Record<string, any> = {};

    public resolve(pluginId: string, tenantId: string): Record<string, any> {
        return {
            ...this.defaultConfig[pluginId],
            ...(this.tenantConfig[tenantId] || {}),
            ...this.runtimeOverride[pluginId]
        };
    }
}
