import { CompanyPlugin } from "../index";
import { ProfileCapability } from "../capabilities/ProfileCapability";
import { CompanyProfileAdapter } from "../adapters/CompanyProfileAdapter";
import { CompanyQualificationWorkflow } from "../workflows/CompanyQualificationWorkflow";

export class CompanyPluginTestSuite {
    public static runGoldenReferenceSuite(): { passed: boolean; details: Record<string, boolean> } {
        const plugin = new CompanyPlugin();
        const selftest = plugin.selftest();
        
        // Capability Independence Test
        const cap = new ProfileCapability();
        cap.enabled = true;
        const capOk = cap.descriptor.semanticId === "company.profile.analyze";

        // Knowledge Adapter Contract Test
        const adapter = new CompanyProfileAdapter();
        const snapshot = adapter.extractKnowledgeSnapshot({ id: "comp_test_1", name: "PT Construction" });
        const knowledgeOk = snapshot.projectionVersion === "1.0.0" && snapshot.nodes.length > 0;

        // Workflow Observability Test
        const wf = new CompanyQualificationWorkflow();
        let eventsFired = 0;
        wf.runQualificationDAG("comp_test_1", (evt) => { eventsFired++; });
        const wfOk = eventsFired === 4;

        const allPassed = Object.values(selftest).every(Boolean) && capOk && knowledgeOk && wfOk;

        return {
            passed: allPassed,
            details: {
                ...selftest,
                capOk,
                knowledgeOk,
                wfOk
            }
        };
    }
}
