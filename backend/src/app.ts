import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { pinoHttp } from 'pino-http';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { v4 as uuidv4 } from 'uuid';
import swaggerUi from 'swagger-ui-express';
import SwaggerParser from '@apidevtools/swagger-parser';
import path from 'path';
import YAML from 'yamljs';
import cookieParser from 'cookie-parser';
import routes from './routes';
import { registerListeners } from './listeners';
import { requestContextMiddleware } from './common/context/RequestContext';
import { PathResolver } from './common/utils/PathResolver';

const app = express();

// Set up Request Context (AsyncLocalStorage)
app.use(requestContextMiddleware);

// Register domain event listeners
registerListeners();

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Parse JSON
app.use(express.json());
app.use(cookieParser());

// Request Logger with X-Request-ID
app.use((req, res, next) => {
  const reqId = req.header('X-Request-ID') || uuidv4();
  req.headers['X-Request-ID'] = reqId;
  res.setHeader('X-Request-ID', reqId);
  next();
});

app.use(
  pinoHttp({
    logger,
    genReqId: (req) => req.headers['X-Request-ID'] as string,
    customSuccessMessage: (_req, _res) => {
      return `request completed`;
    },
    customErrorMessage: (_req, _res, _err) => {
      return `request errored`;
    },
    customProps: (req, _res) => {
      return {
        requestId: req.headers['X-Request-ID'],
        method: req.method,
        path: req.url,
      };
    }
  })
);

// Swagger Documentation
const swaggerPath = PathResolver.apiDocs();
SwaggerParser.bundle(swaggerPath)
  .then((swaggerDocument) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  })
  .catch(() => {
    logger.warn(`Swagger documentation not found or invalid at ${swaggerPath}. Skipping Swagger UI.`);
  });

// Routes
app.use('/api/v1', routes);

// Global Error Handler
app.use(errorHandler);

export default app;
