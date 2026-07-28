import { CognitiveEngine, ExecutionContext } from '../shared/CognitiveEngine';

export class CognitivePipelineOrchestrator {
  private policyEngine: CognitiveEngine<any, any>;
  private ruleEngine: CognitiveEngine<any, any>;
  private reasoningEngine: CognitiveEngine<any, any>;
  private decisionEngine: CognitiveEngine<any, any>;
  private constraintEngine: CognitiveEngine<any, any>;
  private planningEngine: CognitiveEngine<any, any>;
  private approvalEngine: CognitiveEngine<any, any>;
  private executionCoordinator: CognitiveEngine<any, any>;
  private reflectionEngine: CognitiveEngine<any, any>;

  constructor(
    policyEngine: CognitiveEngine<any, any>,
    ruleEngine: CognitiveEngine<any, any>,
    reasoningEngine: CognitiveEngine<any, any>,
    decisionEngine: CognitiveEngine<any, any>,
    constraintEngine: CognitiveEngine<any, any>,
    planningEngine: CognitiveEngine<any, any>,
    approvalEngine: CognitiveEngine<any, any>,
    executionCoordinator: CognitiveEngine<any, any>,
    reflectionEngine: CognitiveEngine<any, any>
  ) {
    this.policyEngine = policyEngine;
    this.ruleEngine = ruleEngine;
    this.reasoningEngine = reasoningEngine;
    this.decisionEngine = decisionEngine;
    this.constraintEngine = constraintEngine;
    this.planningEngine = planningEngine;
    this.approvalEngine = approvalEngine;
    this.executionCoordinator = executionCoordinator;
    this.reflectionEngine = reflectionEngine;
  }

  async runPipeline(initialGoal: any, context: ExecutionContext): Promise<void> {
    console.log(`[CognitivePipeline] Starting pipeline for goal: ${initialGoal.id}`);

    const policyResult = await this.policyEngine.execute(initialGoal, context);
    if (!policyResult.allowed) throw new Error("Policy Engine blocked execution.");

    const ruleResult = await this.ruleEngine.execute(policyResult, context);
    
    const reasoningResult = await this.reasoningEngine.execute(ruleResult, context);
    
    const decisionResult = await this.decisionEngine.execute(reasoningResult, context);
    
    const constraintResult = await this.constraintEngine.execute(decisionResult, context);
    if (constraintResult.severity === 'BLOCKER') throw new Error("Constraint Engine blocker.");
    
    const planResult = await this.planningEngine.execute(constraintResult, context);
    
    const approvalResult = await this.approvalEngine.execute(planResult, context);
    if (!approvalResult.approved) throw new Error("Waiting for Human Approval.");

    const executionResult = await this.executionCoordinator.execute(approvalResult, context);

    await this.reflectionEngine.execute(executionResult, context);

    console.log(`[CognitivePipeline] Pipeline completed for goal: ${initialGoal.id}`);
  }
}
