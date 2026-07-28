export enum MessagePriority {
    LOW = 0,
    NORMAL = 1,
    HIGH = 2,
    CRITICAL = 3
}

export interface MessageContract {
    messageId: string;
    senderId: string;
    receiverId: string;
    correlationId: string;
    priority: MessagePriority;
    ttlMs: number;
    timestamp: Date;
    payload: any;
}
