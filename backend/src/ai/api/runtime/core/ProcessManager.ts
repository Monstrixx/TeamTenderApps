import { AgentProcess, AgentState, AgentManifest } from "../models/AgentProcess";

export class ProcessManager {
    private processes: Map<string, AgentProcess> = new Map();

    public spawn(manifest: AgentManifest, sessionId: string, goalId: string, workspaceId: string, parentProcessId?: string): AgentProcess {
        const process: AgentProcess = {
            processId: `pid-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            agentId: manifest.id,
            parentProcessId,
            sessionId,
            goalId,
            workspaceId,
            state: AgentState.CREATED,
            manifest
        };
        this.processes.set(process.processId, process);
        return process;
    }

    public join(parentPid: string, childPid: string): void {
        const parent = this.processes.get(parentPid);
        if (parent) {
            parent.state = AgentState.OBSERVING; // Waiting for child
        }
    }

    public detach(childPid: string): void {
        const child = this.processes.get(childPid);
        if (child) {
            child.parentProcessId = undefined; // Orphan
        }
    }

    public terminate(pid: string): void {
        const process = this.processes.get(pid);
        if (process) {
            process.state = AgentState.ARCHIVED;
            this.processes.delete(pid);
        }
    }
}
