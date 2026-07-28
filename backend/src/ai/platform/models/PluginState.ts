export enum PluginHealthState {
    READY = "READY",
    DEGRADED = "DEGRADED",
    FAILED = "FAILED",
    DISABLED = "DISABLED",
    UPDATING = "UPDATING"
}

export enum PluginLifecycleState {
    REGISTERED = "REGISTERED",
    INITIALIZED = "INITIALIZED",
    ACTIVE = "ACTIVE",
    PAUSED = "PAUSED",
    UNINSTALLED = "UNINSTALLED"
}
