import { StatusCodes } from 'http-status-codes';

export class BaseError extends Error {
  public statusCode: number;

  constructor(
    message: string,
    public cause: unknown,
    defaultName: string,
    defaultStatus: number,
  ) {
    super(message, { cause });
    this.name = defaultName;
    this.statusCode = defaultStatus;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

export class InternalServerError extends BaseError {
  constructor(message = 'Erro interno do servidor.', cause?: unknown) {
    super(message, cause, 'InternalServerError', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export class ServiceError extends BaseError {
  constructor(message = 'Serviço fora do ar.', cause?: unknown) {
    super(message, cause, 'ServiceError', StatusCodes.SERVICE_UNAVAILABLE);
  }
}

export class NotFoundError extends BaseError {
  constructor(message = 'Recurso não encontrado.', cause?: unknown) {
    super(message, cause, 'NotFoundError', StatusCodes.NOT_FOUND);
  }
}

export class MethodNotAllowedError extends BaseError {
  constructor(message = 'Método não permitido.', cause?: unknown) {
    super(message, cause, 'MethodNotAllowedError', StatusCodes.METHOD_NOT_ALLOWED);
  }
}

export class ValidationError extends BaseError {
  constructor(message = 'Erro de validação.', cause?: unknown) {
    super(message, cause, 'ValidationError', StatusCodes.BAD_REQUEST);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message = 'Não autorizado.', cause?: unknown) {
    super(message, cause, 'UnauthorizedError', StatusCodes.UNAUTHORIZED);
  }
}
