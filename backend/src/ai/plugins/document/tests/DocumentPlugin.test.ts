import { DocumentPlugin } from "../index";
import { DocumentExtractionCapability } from "../capabilities/DocumentExtractionCapability";
import { DocumentSemanticCapability } from "../capabilities/DocumentSemanticCapability";
import { DocumentKnowledgeSource } from "../knowledge/DocumentKnowledgeSource";
import { DocumentIngestionWorkflow } from "../workflows/DocumentIngestionWorkflow";
import { DocumentEventPublisher } from "../events/DocumentEventPublisher";
import { PluginHealthState } from "../../platform/models/PluginState";

async function runTests(): Promise<void> {
    let passed = 0; let total = 0;
    const test = async (name: string, fn: () => Promise<boolean>) => {
        total++;
        try {
            const ok = await fn();
            if (ok) { passed++; console.log(`✅ ${name}`); }
            else { console.log(`❌ ${name}`); }
        } catch (e: any) {
            console.log(`❌ ${name}: ${e.message}`);
        }
    };

    // 1. Plugin Lifecycle
    await test("DocumentPlugin starts and reaches READY state", async () => {
        const plugin = new DocumentPlugin();
        const ctx = { workspaceId: "w1", userId: "u1", permissions: [], apis: { runtime: {}, knowledge: {}, mesh: {}, events: { publish: () => {} }, artifacts: {} as any }, logger: { info: () => {}, error: () => {} }, telemetry: { record: () => {} } };
        await plugin.start(ctx as any);
        return plugin.health() === PluginHealthState.READY;
    });

    await test("DocumentPlugin selftest returns all 10 KPI checks", async () => {
        const plugin = new DocumentPlugin();
        await plugin.start({ workspaceId: "w1", userId: "u1", permissions: [], apis: { runtime: {}, knowledge: {}, mesh: {}, events: { publish: () => {} }, artifacts: {} as any }, logger: { info: () => {}, error: () => {} }, telemetry: { record: () => {} } } as any);
        const st = plugin.selftest();
        return Object.keys(st).length >= 10 && st.ocrAccuracyOk === true;
    });

    // 2. Locks 53-58 Document Intelligence Validation
    await test("Lock 57: DocumentFingerprint generated with SHA256", () => Promise.resolve(() => {
        const ext = new DocumentExtractionCapability();
        const fp = ext.generateFingerprint("tender.pdf", "sample raw pdf text content");
        return fp.sha256.startsWith("sha256-") && fp.fileName === "tender.pdf" && fp.pageCount >= 1;
    })());

    await test("Lock 54 Multi-modal Evidence & Lock 55 Layout Preservation", async () => {
        const ext = new DocumentExtractionCapability();
        const fp = ext.generateFingerprint("tender.pdf", "sample raw text");
        const { evidences, layout, confidence } = await ext.extractMultiModalEvidence(fp, "sample raw text");
        const hasOCR = evidences.some(e => e.type === "OCR_TEXT");
        const hasTable = evidences.some(e => e.type === "TABLE");
        const hasStamp = evidences.some(e => e.type === "STAMP");
        const layoutHasHierarchy = layout.some(l => l.headingLevel === 1);
        return hasOCR && hasTable && hasStamp && layoutHasHierarchy && confidence.propagatedConfidence > 0;
    });

    await test("Lock 58 Semantic Citation & Lock 53 Lineage", async () => {
        const ext = new DocumentExtractionCapability();
        const sem = new DocumentSemanticCapability();
        const fp = ext.generateFingerprint("tender.pdf", "sample text");
        const { evidences } = await ext.extractMultiModalEvidence(fp, "sample text");
        const citations = sem.generateCitations(evidences);
        const citeHasPage = citations[0].pageNumber >= 1;
        const citeHasBoundingBox = citations[0].boundingBox.width > 0;
        const citeHasLineage = !!citations[0].lineage.documentFingerprintSha256;
        return citeHasPage && citeHasBoundingBox && citeHasLineage;
    });

    // 3. Explicit Document Ingestion DAG
    await test("Explicit 10-step Document Ingestion DAG executes end-to-end", async () => {
        const ext = new DocumentExtractionCapability();
        const sem = new DocumentSemanticCapability();
        const knw = new DocumentKnowledgeSource();
        const evt = new DocumentEventPublisher();
        const wf = new DocumentIngestionWorkflow(ext, sem, knw, evt);

        const result = await wf.execute("RAB_Kontruksi.pdf", "Sample RAB Content");
        const pkg = knw.buildKnowledgePackage(result);
        return result.fingerprint.fileName === "RAB_Kontruksi.pdf" && result.citations.length > 0 && pkg.knowledgeNodes.length > 0;
    });

    console.log(`\nDocumentPlugin Tests: ${passed}/${total} PASSED`);
    if (passed < total) process.exit(1);
}

runTests().catch(console.error);
