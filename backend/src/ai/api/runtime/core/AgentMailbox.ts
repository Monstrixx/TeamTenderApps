import { MessageContract } from "../models/MessageContract";

export class AgentMailbox {
    private queue: MessageContract[] = [];

    constructor(public readonly ownerProcessId: string) {}

    public receive(message: MessageContract): void {
        this.queue.push(message);
        // Sort by priority (descending)
        this.queue.sort((a, b) => b.priority - a.priority);
    }

    public getNextMessage(): MessageContract | undefined {
        return this.queue.shift();
    }

    public hasMessages(): boolean {
        return this.queue.length > 0;
    }
}
