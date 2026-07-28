import { AgentProcess, AgentState } from "../models/AgentProcess";

export class RuntimeScheduler {
    private priorityQueue: AgentProcess[] = [];
    private delayedQueue: AgentProcess[] = [];
    private retryQueue: AgentProcess[] = [];
    private waitingQueue: AgentProcess[] = [];
    private approvalQueue: AgentProcess[] = [];

    public schedule(process: AgentProcess): void {
        switch (process.state) {
            case AgentState.WAITING_APPROVAL:
                this.approvalQueue.push(process);
                break;
            case AgentState.REPLANNING:
                this.retryQueue.push(process);
                break;
            case AgentState.READY:
            case AgentState.PLANNING:
            case AgentState.EXECUTING:
                this.priorityQueue.push(process);
                break;
            default:
                this.waitingQueue.push(process);
                break;
        }
    }

    // In a real OS, a loop would pick processes from PriorityQueue
    public tick(): AgentProcess | undefined {
        return this.priorityQueue.shift();
    }
}
