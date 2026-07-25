import pino from 'pino';

export const auditLogger = pino({
  name: 'audit',
  level: process.env.AUDIT_LOG_LEVEL || 'info',
  // Different transport could be used for audit logs specifically
  transport:
    process.env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            messageFormat: '[AUDIT] {msg}',
          },
        }
      : undefined,
});
