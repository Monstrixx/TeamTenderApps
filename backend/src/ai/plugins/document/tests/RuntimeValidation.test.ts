import * as path from "path";
import { PluginRuntimeValidator } from "../../platform/validation/PluginRuntimeValidator";
import { IPluginRuntimeProcess } from "../../platform/runtime/PluginRuntime";
import { PluginContext } from "../../platform/host/PluginContext";
import { PluginContainer } from "../../platform/sandbox/PluginContainer";
import { DocumentPlugin } from "../index";

const MANIFEST_PATH = path.resolve(__dirname, "../manifest.json");
const PLATFORM_SRC  = path.resolve(__dirname, "../../platform");

const processFactory = (): IPluginRuntimeProcess => new DocumentPlugin();

const contextFactory = (): PluginContext => ({
    workspaceId: "ws-doc-test-001",
    userId: "user-test-001",
    permissions: ["READ", "WRITE", "DOCUMENT_MANAGE"],
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
            id: "teamtender.plugin.document", version: "1.0.0", type: "Domain", owner: "TeamTender",
            description: "Document Intelligence", capabilities: [], workflows: [], permissions: [],
            policies: [], dependencies: {}, telemetry: [], compatibility: {},
            signature: { publisher: "TeamTender Root CA", signature: "SIG_DOC", checksum: "CK_DOC", buildHash: "BH_DOC" }
        },
        { maxMemoryMb: 512, maxCpuMs: 10000, maxTokens: 100000, maxRequests: 20 } as any,
        {} as any
    );

export async function runDocumentRuntimeValidation(): Promise<void> {
    const validator = new PluginRuntimeValidator();
    const results = await validator.runFullValidation({
        pluginId: "teamtender.plugin.document",
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
    console.log(`\nDocument Plugin Runtime Validation: ${passed}/${results.length} Locks PASSED`);
    if (passed < results.length) process.exit(1);
}

runDocumentRuntimeValidation().catch(console.error);
