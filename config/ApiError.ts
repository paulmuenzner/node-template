import { Response } from 'express';
import {
  AccessTokenErrorResponse,
  AuthFailureResponse,
  BadRequestResponse,
  ForbiddenResponse,
  InternalErrorResponse,
  NotFoundResponse,
  TryCatchErrorResponse,
} from './ApiResponse';
import { config } from './config';

enum ErrorType {
  BAD_TOKEN = 'BadTokenError',
  TOKEN_EXPIRED = 'TokenExpiredError',
  UNAUTHORIZED = 'AuthFailureError',
  ACCESS_TOKEN = 'AccessTokenError',
  INTERNAL = 'InternalError',
  NOT_FOUND = 'NotFoundError',
  NO_ENTRY = 'NoEntryError',
  NO_DATA = 'NoDataError',
  TRY_CATCH = 'TryCatchError',
  BAD_REQUEST = 'BadRequestError',
  FORBIDDEN = 'ForbiddenError',
}

export abstract class ApiError extends Error {
  constructor(
    public type: ErrorType,
    public message: string = 'error',
    public internalMessage: string = 'No internal message provided.',
  ) {
    super(type);
  }

  public static handle(err: ApiError, res: Response): Response {
    const error = {
      meta: err,
      stack: err.stack,
    };
    switch (err.type) {
      case ErrorType.BAD_TOKEN:
      case ErrorType.TOKEN_EXPIRED:
      case ErrorType.UNAUTHORIZED:
        return new AuthFailureResponse(err.message, error).send(res);
      ////////////////////////
      case ErrorType.ACCESS_TOKEN:
        return new AccessTokenErrorResponse(err.message, error).send(res);
      case ErrorType.INTERNAL:
        return new InternalErrorResponse(err.message, error).send(res);
      case ErrorType.NOT_FOUND:
      case ErrorType.NO_ENTRY:
      case ErrorType.NO_DATA:
        return new NotFoundResponse(err.message, error).send(res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message, error).send(res);
      case ErrorType.TRY_CATCH:
        return new TryCatchErrorResponse(err.message, error).send(res);
      case ErrorType.FORBIDDEN:
        return new ForbiddenResponse(err.message, error).send(res);
      default: {
        let message = err.message;
        // Do not send failure message in production as it may send sensitive data
        if (config.environment === 'production') message = 'Something wrong happened.';
        return new InternalErrorResponse(message, error).send(res);
      }
    }
  }
}

export class AuthFailureError extends ApiError {
  constructor(message = 'Invalid Credentials', internalMessage?: string) {
    super(ErrorType.UNAUTHORIZED, message, internalMessage);
  }
}

export class InternalError extends ApiError {
  constructor(
    message = 'Internal error. Please try again later.',

    internalMessage?: string,
  ) {
    super(ErrorType.INTERNAL, message, internalMessage);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = 'Bad Request', internalMessage?: string) {
    super(ErrorType.BAD_REQUEST, message, internalMessage);
  }
}

export class TryCatchError extends ApiError {
  constructor(
    message = 'Currently no access. Try again later.',

    internalMessage?: string,
  ) {
    super(ErrorType.TRY_CATCH, message, internalMessage);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Not Found', internalMessage?: string) {
    super(ErrorType.NOT_FOUND, message, internalMessage);
  }
}

export class ForbiddenError extends ApiError {
  constructor(
    message = 'Permission denied',

    internalMessage?: string,
  ) {
    super(ErrorType.FORBIDDEN, message, internalMessage);
  }
}

export class NoEntryError extends ApiError {
  constructor(
    message = "Entry don't exists",

    internalMessage?: string,
  ) {
    super(ErrorType.NO_ENTRY, message, internalMessage);
  }
}

export class BadTokenError extends ApiError {
  constructor(
    message = 'Access denied. Please login again to receive access.',

    internalMessage?: string,
  ) {
    super(ErrorType.BAD_TOKEN, message, internalMessage);
  }
}

export class TokenExpiredError extends ApiError {
  constructor(
    message = 'Token is expired',

    internalMessage?: string,
  ) {
    super(ErrorType.TOKEN_EXPIRED, message, internalMessage);
  }
}

export class NoDataError extends ApiError {
  constructor(
    message = 'No data available',

    internalMessage?: string,
  ) {
    super(ErrorType.NO_DATA, message, internalMessage);
  }
}

export class AccessTokenError extends ApiError {
  constructor(
    message = 'Invalid access token',

    internalMessage?: string,
  ) {
    super(ErrorType.ACCESS_TOKEN, message, internalMessage);
  }
}
