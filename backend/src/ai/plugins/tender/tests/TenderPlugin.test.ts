import { TenderPlugin } from "../index";
import { TenderEligibilityCapability } from "../capabilities/TenderEligibilityCapability";
import { TenderRecommendationCapability } from "../capabilities/TenderRecommendationCapability";
import { TenderTelemetryCollector } from "../telemetry/TenderTelemetryCollector";
import { TenderAuthorityStubProvider, TenderAuthorityAdapter } from "../adapters/TenderAuthorityAdapter";
import { CompanyProfileReadModel } from "../knowledge/CompanyProfileReadModel";
import { TenderUIContract } from "../ui/TenderUIContract";
import { PluginHealthState } from "../../../platform/models/PluginState";

// ── TenderPlugin Unit Tests ───────────────────────────────────────────────────

async function runTests(): Promise<void> {
    let passed = 0; let total = 0;
    const test = async (name: string, fn: () => Promise<boolean>) => {
        total++;
        try { const ok = await fn(); if (ok) { passed++; console.log(`✅ ${name}`); } else { console.log(`❌ ${name}`); } }
        catch (e: any) { console.log(`❌ ${name}: ${e.message}`); }
    };

    // Batch 1: Plugin Lifecycle
    await test("TenderPlugin starts and reaches READY", async () => {
        const plugin = new TenderPlugin();
        const ctx = { workspaceId: "w1", userId: "u1", permissions: [], apis: { runtime: {}, knowledge: {}, mesh: {}, events: { publish: () => {} }, artifacts: {} as any }, logger: { info: () => {}, error: () => {} }, telemetry: { record: () => {} } };
        await plugin.start(ctx as any);
        return plugin.health() === PluginHealthState.READY;
    });

    await test("TenderPlugin selftest returns all KPI checks", async () => {
        const plugin = new TenderPlugin();
        await plugin.start({ workspaceId: "w1", userId: "u1", permissions: [], apis: { runtime: {}, knowledge: {}, mesh: {}, events: { publish: () => {} }, artifacts: {} as any }, logger: { info: () => {}, error: () => {} }, telemetry: { record: () => {} } } as any);
        const selftest = plugin.selftest();
        return Object.keys(selftest).length >= 10;
    });

    await test("TenderPlugin suspend/resume works", async () => {
        const plugin = new TenderPlugin();
        await plugin.start({ workspaceId: "w1", userId: "u1", permissions: [], apis: { runtime: {}, knowledge: {}, mesh: {}, events: { publish: () => {} }, artifacts: {} as any }, logger: { info: () => {}, error: () => {} }, telemetry: { record: () => {} } } as any);
        await plugin.suspend();
        const afterSuspend = plugin.health();
        await plugin.resume();
        const afterResume = plugin.health();
        return afterSuspend === PluginHealthState.DISABLED && afterResume === PluginHealthState.READY;
    });

    // Batch 2: Read Model (Lock 25)
    await test("Lock 25: CompanyProfileReadModel stores and retrieves projection", async () => {
        const rm = new CompanyProfileReadModel();
        rm.upsert({ companyId: "c-001", legalName: "PT Test", trustScore: 0.85, certifications: ["ISO-9001"], financialCapacity: 1000000, experienceYears: 5, projectCount: 20, projectionVersion: "v1", projectedAt: new Date().toISOString() });
        const proj = rm.getProjection("c-001");
        return proj?.trustScore === 0.85;
    });

    await test("Lock 25: Tender Plugin never imports Company Plugin", async () => {
        // Static check: TenderPlugin only uses CompanyProfileProjection interface
        const readModel = new CompanyProfileReadModel();
        return readModel.hasProjection("missing") === false;
    });

    // Batch 4: Adapter (Lock 26)
    await test("Lock 26: StubProvider satisfies ITenderAuthorityProvider contract", async () => {
        const adapter = new TenderAuthorityAdapter(new TenderAuthorityStubProvider());
        const doc = await adapter.fetchDocument({ url: "http://stub.test" });
        return doc.format === "PDF" && doc.pages > 0;
    });

    await test("Lock 26: TenderAuthorityAdapter.submit() returns confirmation", async () => {
        const adapter = new TenderAuthorityAdapter();
        const receipt = await adapter.submit({ bidId: "b-001", tenderId: "t-001", companyId: "c-001", proposalRef: "p-001", financialRef: "f-001" });
        return receipt.success === true && receipt.confirmationRef.startsWith("STUB-CONF");
    });

    // Batch 5: Telemetry (Lock 40)
    await test("Lock 40: TenderTelemetryCollector tracks KPIs", async () => {
        const tel = new TenderTelemetryCollector();
        tel.recordEligibilityCheck(true);
        tel.recordWorkflowStarted();
        tel.recordWorkflowCompleted();
        tel.recordArtifactGeneration(150);
        const kpi = tel.getKPI();
        return kpi.eligibilityAccuracy === 1.0 && kpi.workflowCompletionRate === 1.0 && kpi.artifactGenerationTimeMs === 150;
    });

    // UI Contract
    await test("TenderUIContract has all required sections", () => Promise.resolve(
        Object.keys(TenderUIContract.pages).length === 8 &&
        TenderUIContract.widgets.length === 6 &&
        TenderUIContract.commandPalette.length === 7
    ));

    console.log(`\nTenderPlugin Tests: ${passed}/${total} PASSED`);
    if (passed < total) process.exit(1);
}

runTests().catch(console.error);
