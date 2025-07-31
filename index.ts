import cluster from 'cluster';
import cors from 'cors';
import helmet from 'helmet';
import os from 'os';
import { ApiError, InternalError, Logger, NotFoundError } from './config';
import './register-aliases';
import setupSwagger from './utils/swagger';

const logger = new Logger();
const numberOfCores = os.cpus().length;

import express, { NextFunction, Request, Response } from 'express';
import { config } from './config';
const app = express();

// Limit requests from same API
if (cluster.isPrimary && numberOfCores > 1) {
  for (let i = 0; i < numberOfCores; i++) {
    // fork child process
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    // console.log(`worker ${worker.process.pid} died`);
    // console.log("Let's fork another worker!");
    cluster.fork();
  });
  // console.log(`Master PID: ${process.pid}`);
} else {
  ////////////////////////////////////////////
  ////// SECURITY CONFIG
  ////////////////////////////

  // Rate limiting
  app.use('/api', config.globalLimiter);

  // Set Security HTTP headers https://helmetjs.github.io
  app.use(helmet());

  // Permitted-Cross-Domain-Policies
  app.use(helmet.permittedCrossDomainPolicies());

  // Set Content Security policy
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
      },
    }),
  );

  // Cors
  app.use(
    cors({
      origin: config.corsWhitelist,
      optionsSuccessStatus: 200,
      methods: 'POST, GET',
      credentials: true,
    }),
  );

  // Use built-in express middleware for body parsing
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Swagger
  setupSwagger(app, Number(config.port));

  // Load routes
  const healthRoutes = require('./routes/health.routes');
  const userRoutes = require('./routes/user.routes');
  app.use('/api/health', healthRoutes);
  app.use('/api/users', config.authLimiter, userRoutes);

  // Error handling
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError(`Route ${req.originalUrl} not found!`));
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
      logger.error(err.message + ', ' + err.stack + ', ' + err.type);
      ApiError.handle(err, res);
    } else {
      if (config.environment === 'development') {
        logger.error(err);
        return res.status(500).send(err.message);
      }
      logger.error(err);
      ApiError.handle(new InternalError('Something went wrong!'), res);
      // ApiError.handle(new InternalError(), res);
    }
  });

  if (cluster.worker?.id === 1) {
    app.listen(config.port, () => {
      console.log(`Server with ${numberOfCores} cores listening on port ${config.port}`);
      console.log(`Open: http://localhost:${config.port}`);
    });
  } else {
    app.listen(config.port, () => {});
  }
}
