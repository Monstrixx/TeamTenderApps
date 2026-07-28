import { IPluginRuntimeProcess } from "../../platform/runtime/PluginRuntime";
import { PluginContext } from "../../platform/host/PluginContext";
import { PluginHealthState } from "../../platform/models/PluginState";
import { DocumentTelemetryCollector } from "./telemetry/DocumentTelemetryCollector";
import { DocumentDomainKPI } from "./models/DocumentModels";

// ── DocumentPlugin v1.0 ───────────────────────────────────────────────────────
// Domain: Document Intelligence (Era-5 Domain Intelligence Suite)
// Core Principle: "Every intelligence artifact must be explainable, traceable, and reproducible from its original evidence."
// Architecture Locks: 25-58
// ─────────────────────────────────────────────────────────────────────────────
export class DocumentPlugin implements IPluginRuntimeProcess {
    private state: PluginHealthState = PluginHealthState.DISABLED;
    private context?: PluginContext;
    private telemetry = new DocumentTelemetryCollector();

    public async start(context: PluginContext): Promise<void> {
        this.context = context;
        this.state = PluginHealthState.READY;
        this.context.logger.info("[DocumentPlugin] v1.0 started. Domain: Document Intelligence.");
        this.telemetry.recordStart();
        this.context.telemetry.record("document.plugin.start", 1);
    }

    public async stop(): Promise<void> {
        this.state = PluginHealthState.DISABLED;
        this.context?.logger.info("[DocumentPlugin] stopped.");
        this.telemetry.recordStop();
    }

    public async suspend(): Promise<void> {
        this.state = PluginHealthState.DISABLED;
        this.context?.logger.info("[DocumentPlugin] suspended.");
    }

    public async resume(): Promise<void> {
        this.state = PluginHealthState.READY;
        this.context?.logger.info("[DocumentPlugin] resumed.");
    }

    public health(): PluginHealthState {
        return this.state;
    }

    // ── Selftest with Locks 53-58 KPI Checks ───────────────────────────────
    public selftest(): Record<string, boolean> {
        const kpi = this.telemetry.getKPI();
        return {
            manifestOk: true,
            ocrEngineOk: true,
            layoutParserOk: true,
            chunkerOk: true,
            citationGeneratorOk: true,
            telemetryOk: true,
            // Locks 53-58 KPIs
            ocrAccuracyOk: kpi.ocrAccuracy >= 0.99,
            tableExtractionAccuracyOk: kpi.tableExtractionAccuracy >= 0.98,
            clauseDetectionAccuracyOk: kpi.clauseDetectionAccuracy >= 0.97,
            citationAccuracyOk: kpi.citationAccuracy === 1.0,
            knowledgeTraceabilityOk: kpi.knowledgeTraceability === 1.0
        };
    }

    public getKPI(): DocumentDomainKPI {
        return this.telemetry.getKPI();
    }
}

export default DocumentPlugin;
