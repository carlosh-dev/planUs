import { StatusCodes } from 'http-status-codes';

export class BaseError extends Error {
  public statusCode: number;

  constructor(
    message: string,
    public cause: unknown,
    defaultMessage: string,
    defaultName: string,
    defaultStatus: number,
  ) {
    super(message || defaultMessage, { cause });
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
    super(
      message,
      cause,
      'Recurso não encontrado',
      'InternalServerError',
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

export class ServiceError extends BaseError {
  constructor(message = 'Sevriço fora do ar.', cause?: unknown) {
    super(
      message,
      cause,
      'Sevriço fora do ar.',
      'ServiceError',
      StatusCodes.SERVICE_UNAVAILABLE,
    );
  }
}

export class NotFoundError extends BaseError {
  constructor(message = 'Recurso não encontrado.', cause?: unknown) {
    super(
      message,
      cause,
      'Recurso não encontrado.',
      'NotFoundError',
      StatusCodes.NOT_FOUND,
    );
  }
}

export class MethodNotAllowedError extends BaseError {
  constructor(message = 'Método não permitido.', cause?: unknown) {
    super(
      message,
      cause,
      'Método não permitido.',
      'MethodNotAllowedError',
      StatusCodes.METHOD_NOT_ALLOWED,
    );
  }
}

export class ValidationError extends BaseError {
  constructor(message = 'Erro de validação.', cause?: unknown) {
    super(
      message,
      cause,
      'Erro de validação.',
      'ValidationError',
      StatusCodes.BAD_REQUEST,
    );
  }
}

export class UnauthorazedError extends BaseError {
  constructor(message = 'Não autorizado.', cause?: unknown) {
    super(
      message,
      cause,
      'Não autorizado.',
      'UnauthorazedError',
      StatusCodes.UNAUTHORIZED,
    );
  }
}
