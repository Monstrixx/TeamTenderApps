import * as path from "path";
import { PluginRuntimeValidator } from "../../../platform/validation/PluginRuntimeValidator";
import { IPluginRuntimeProcess } from "../../../platform/runtime/PluginRuntime";
import { PluginContext } from "../../../platform/host/PluginContext";
import { PluginContainer } from "../../../platform/sandbox/PluginContainer";
import { CompanyPlugin } from "../index";

// ── AI-09D: Runtime Validation Test Suite ────────────────────────────────────
// CRITICAL RULE: This file uses IPluginRuntimeProcess, never CompanyPlugin directly after factory.
// The factory pattern is the ONLY place the concrete class appears.
// The validator receives it as IPluginRuntimeProcess.
// ─────────────────────────────────────────────────────────────────────────────

const MANIFEST_PATH = path.resolve(__dirname, "../manifest.json");
const PLATFORM_SRC  = path.resolve(__dirname, "../../../platform");

// ── Generic Factories ─────────────────────────────────────────────────────────
const processFactory = (): IPluginRuntimeProcess => new CompanyPlugin();

const contextFactory = (): PluginContext => ({
    workspaceId: "ws-test-001",
    userId: "user-test-001",
    permissions: ["READ", "WRITE"],
    apis: {
        runtime: {},
        knowledge: {},
        mesh: {},
        events: { publish: (e, p) => {} },
        artifacts: { store: async () => {}, retrieve: async () => null } as any
    },
    logger: { info: (m) => {}, error: (m) => {} },
    telemetry: { record: (m, v) => {} }
});

const containerFactory = (): PluginContainer => {
    return new PluginContainer(
        { id: "teamtender.plugin.company", version: "1.0.0", type: "Domain", owner: "TeamTender", description: "", capabilities: [], workflows: [], permissions: [], policies: [], dependencies: {}, telemetry: [], compatibility: {}, signature: { publisher: "TeamTender", signature: "SIG", checksum: "CK", buildHash: "BH" } },
        { maxMemoryMb: 256, maxCpuMs: 5000, maxTokens: 50000, maxRequests: 100 } as any,
        {} as any
    );
};

// ── Run Full Validation ───────────────────────────────────────────────────────
export async function runAI09DValidation(): Promise<void> {
    const validator = new PluginRuntimeValidator();
    const results = await validator.runFullValidation({
        pluginId: "teamtender.plugin.company",
        manifestPath: MANIFEST_PATH,
        platformSrcDir: PLATFORM_SRC,
        processFactory,
        contextFactory,
        containerFactory
    });

    let passed = 0;
    for (const r of results) {
        const status = r.passed ? "✅ PASS" : "❌ FAIL";
        console.log(`[${status}] Lock: ${r.lock} — ${r.details}`);
        if (r.passed) passed++;
    }
    console.log(`\nAI-09D Result: ${passed}/${results.length} Validation Locks PASSED`);
    if (passed < results.length) process.exit(1);
}

runAI09DValidation().catch(console.error);
