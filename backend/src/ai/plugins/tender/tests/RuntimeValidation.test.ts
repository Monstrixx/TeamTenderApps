import * as path from "path";
import { PluginRuntimeValidator } from "../../../platform/validation/PluginRuntimeValidator";
import { IPluginRuntimeProcess } from "../../../platform/runtime/PluginRuntime";
import { PluginContext } from "../../../platform/host/PluginContext";
import { PluginContainer } from "../../../platform/sandbox/PluginContainer";
import { TenderPlugin } from "../index";

// ── AI-10C Runtime Validation — AI-09D Pattern Applied to Tender Plugin ───────
// CRITICAL: Factory pattern only. Never reference TenderPlugin directly in Validator.
// ─────────────────────────────────────────────────────────────────────────────

const MANIFEST_PATH = path.resolve(__dirname, "../manifest.json");
const PLATFORM_SRC  = path.resolve(__dirname, "../../../platform");

const processFactory = (): IPluginRuntimeProcess => new TenderPlugin();

const contextFactory = (): PluginContext => ({
    workspaceId: "ws-tender-test-001",
    userId: "user-test-001",
    permissions: ["READ", "WRITE", "TENDER_MANAGE"],
    apis: {
        runtime: {},
        knowledge: {},
        mesh: {},
        events: { publish: () => {} },
        artifacts: { store: async () => {}, retrieve: async () => null } as any
    },
    logger: { info: () => {}, error: () => {} },
    telemetry: { record: () => {} }
});

const containerFactory = (): PluginContainer =>
    new PluginContainer(
        {
            id: "teamtender.plugin.tender", version: "1.0.0", type: "Domain", owner: "TeamTender",
            description: "Tender Intelligence", capabilities: [], workflows: [], permissions: [],
            policies: [], dependencies: {}, telemetry: [], compatibility: {},
            signature: { publisher: "TeamTender Root CA", signature: "SIG_TENDER", checksum: "CK_TENDER", buildHash: "BH_TENDER" }
        },
        { maxMemoryMb: 512, maxCpuMs: 10000, maxTokens: 100000, maxRequests: 20 } as any,
        {} as any
    );

export async function runTenderRuntimeValidation(): Promise<void> {
    const validator = new PluginRuntimeValidator();
    const results = await validator.runFullValidation({
        pluginId: "teamtender.plugin.tender",
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
    console.log(`\nTender Plugin AI-10C Validation: ${passed}/${results.length} Locks PASSED`);
    if (passed < results.length) process.exit(1);
}

runTenderRuntimeValidation().catch(console.error);
