import { Response } from 'express';
import { config } from '../config';

// Helper code for the API consumer to understand the error and handle it accordingly
enum StatusCode {
  SUCCESS = '10000',
  FAILURE = '10001',
  RETRY = '10002',
  INVALID_ACCESS_TOKEN = '10003',
}

enum ResponseStatus {
  SUCCESS = 200,
  ACCEPTED = 202,
  MOVED_PERMANENTLY = 301,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

abstract class ApiResponse {
  constructor(
    protected statusCode: StatusCode,
    protected status: ResponseStatus,
    protected message: string,
    protected error?: string,
  ) {}

  protected prepare<T extends ApiResponse>(res: Response, response: T): Response {
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }

  public send(res: Response): Response {
    return this.prepare<ApiResponse>(res, this);
  }

  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);

    // @ts-ignore
    if (config.environment != 'development') {
      delete clone.error;
    }
    for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
    return clone;
  }
}

export class AuthFailureResponse extends ApiResponse {
  constructor(message = 'Authentication Failure', stack: any) {
    super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message, stack);
  }
}

export class NotFoundResponse extends ApiResponse {
  private url: string | undefined;

  constructor(message = 'Not Found', stack: any) {
    super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message, stack);
  }

  send(res: Response): Response {
    this.url = res.req?.originalUrl;
    return super.prepare<NotFoundResponse>(res, this);
  }
}

export class ForbiddenResponse extends ApiResponse {
  constructor(message = 'Forbidden', stack: any) {
    super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message, stack);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message = 'Bad Parameters', stack: any) {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message, stack);
  }
}

export class TryCatchErrorResponse extends ApiResponse {
  constructor(message = 'Currently no access. Try again later.', stack: any) {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message, stack);
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(message = 'Internal Error', stack: any) {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message, stack);
  }
}

export class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }
}

export class AcceptedMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.ACCEPTED, message);
  }
}

export class FailureMsgResponse extends ApiResponse {
  constructor(message: string, stack: any) {
    super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message, stack);
  }
}

export class SuccessResponse<T> extends ApiResponse {
  constructor(
    message: string,
    private data: T,
  ) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response): Response {
    return super.prepare<SuccessResponse<T>>(res, this);
  }
}

export class AccessTokenErrorResponse extends ApiResponse {
  private instruction = 'refresh_token';

  constructor(message = 'Access token invalid', stack: any) {
    super(StatusCode.INVALID_ACCESS_TOKEN, ResponseStatus.UNAUTHORIZED, message, stack);
  }

  send(res: Response): Response {
    res.setHeader('instruction', this.instruction);
    return super.prepare<AccessTokenErrorResponse>(res, this);
  }
}

export class TokenRefreshResponse extends ApiResponse {
  constructor(
    message: string,
    private accessToken: string,
    private refreshToken: string,
  ) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response): Response {
    return super.prepare<TokenRefreshResponse>(res, this);
  }
}
