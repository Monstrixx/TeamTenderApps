import { DomainEventDispatcher } from '../common/events/DomainEventDispatcher';
import { DomainEventListener } from '../common/events/EventListener';
import { eventDispatcher } from '../common/events/NodeEventDispatcher';

import { AuditListener } from './audit.listener';
import { NotificationListener } from './notification.listener';
import { ActivityListener } from './activity.listener';
import { AiListener } from './ai.listener';

const listeners: DomainEventListener[] = [
  new AuditListener(),
  new NotificationListener(),
  new ActivityListener(),
  new AiListener(),
];

export const registerListeners = () => {
  listeners.forEach((listener) => {
    listener.register(eventDispatcher);
  });
};

export const disposeListeners = async () => {
  for (const listener of listeners) {
    if (listener.dispose) {
      await listener.dispose();
    }
  }
};
