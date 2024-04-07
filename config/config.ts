import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import path from 'path';

dotenv.config();

export const config = {
  port: process.env.SERVER_PORT || 8000,
  environment: process.env.NODE_ENV || 'development',
  logDirectory: path.join(process.cwd(), '/log'),
  globalLimiter: rateLimit({
    max: 100,
    windowMs: 15 * 60 * 1000, //15 minutes
    message: 'Too many requests from this IP!',
  }),
  authLimiter: rateLimit({
    max: 20,
    windowMs: 15 * 60 * 1000, //15 minutes
    message: 'Too many requests from this IP!',
  }),
  corsWhitelist: ['https://example.com', 'http://localhost'],
};
