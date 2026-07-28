import { AgentProcess, AgentState, AgentManifest } from "../runtime/models/AgentProcess";
import { ProcessManager } from "../runtime/core/ProcessManager";

export class AgentFluentAPI {
    private processManager = new ProcessManager();

    public async spawn(manifest: AgentManifest, goalId: string, workspaceId: string): Promise<AgentProcess> {
        return this.processManager.spawn(manifest, `sess-${Date.now()}`, goalId, workspaceId);
    }

    public async pause(pid: string): Promise<void> {
        // Enters wait state
    }

    public async resume(pid: string): Promise<void> {
        // Re-enters priority queue
    }

    public async join(parentPid: string, childPid: string): Promise<void> {
        this.processManager.join(parentPid, childPid);
    }

    public async cancel(pid: string): Promise<void> {
        this.processManager.terminate(pid);
    }

    public async watch(pid: string, callback: (state: AgentState) => void): Promise<void> {
        // Listen to agent state transitions
    }
}
