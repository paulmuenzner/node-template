import { NextFunction, Request, RequestHandler, Response } from 'express';

type AsyncMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export function catchAsync(fn: AsyncMiddleware): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if fn returns a Promise
    if (typeof fn === 'function' && fn.constructor.name === 'AsyncFunction') {
      fn(req, res, next).catch(next);
    } else {
      // If not, call it directly without catch
      fn(req, res, next);
    }
  };
}
