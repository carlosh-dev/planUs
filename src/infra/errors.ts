import { StatusCodes } from 'http-status-codes';

export type BaseErrorType = {
  message?: string;
  details?: { message: string }[];
  cause?: unknown;
  action?: string;
  statusCode?: number;
};

export class InternalServerError extends Error {
  public readonly action: string;
  public readonly statusCode: number;
  public readonly details?: { message: string }[];

  constructor(
    message: string,
    { cause, action, statusCode, details }: BaseErrorType = {},
  ) {
    super(message, { cause });
    this.name = new.target.name || 'InternalServerError';
    this.action = action ?? 'Entre em contato com o suporte.';
    this.statusCode = statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
    this.details = details ?? [];
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}

export class ServiceError extends Error {
  public readonly action: string;
  public readonly statusCode: number;
  public readonly details?: { message: string }[];

  constructor({ cause, message, details }: BaseErrorType = {}) {
    super(message || 'Serviço indisponivel no momento.', {
      cause,
    });
    this.name = 'ServiceError';
    this.action = 'Verifique se o serviço está disponível.';
    this.statusCode = StatusCodes.SERVICE_UNAVAILABLE;
    this.details = details ?? [];
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}

export class MethodNotAllowedError extends Error {
  public readonly action: string;
  public readonly statusCode: number;
  public readonly details?: { message: string }[];

  constructor({ cause, message, details }: BaseErrorType = {}) {
    super(message || 'Método não permitido para este endpoint.', {
      cause,
    });
    this.name = 'MethodNotAllowedError';
    this.action =
      'Verifique se o método HTTP enviado é válido para este endpoint.';
    this.statusCode = StatusCodes.METHOD_NOT_ALLOWED;
    this.details = details ?? [];
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}

export class ValidationError extends Error {
  public readonly action: string;
  public readonly statusCode: number;
  public readonly details?: { message: string }[];

  constructor({ cause, message, action, details }: BaseErrorType = {}) {
    super(message || 'Um erro de validação ocorreu.', {
      cause,
    });
    this.name = 'ValidationError';
    this.action = action || 'Ajuste os dados eviados e tente novamente.';
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.details = details ?? [];
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}

export class NotFoundError extends Error {
  public readonly action: string;
  public readonly statusCode: number;
  public readonly details?: { message: string }[];

  constructor({ cause, message, action, details }: BaseErrorType = {}) {
    super(message || 'Recurso não encontrado.', {
      cause,
    });
    this.name = 'NotFoundError';
    this.action =
      action ||
      'Verifique se os paremetros enviados na consulta estão corretos.';
    this.statusCode = StatusCodes.NOT_FOUND;
    this.details = details ?? [];
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}

export class UnauthorazedError extends Error {
  public readonly action: string;
  public readonly statusCode: number;
  public readonly details?: { message: string }[];

  constructor({ cause, message, action, details }: BaseErrorType = {}) {
    super(message || 'Usuário não autenticado.', {
      cause,
    });
    this.name = 'UnauthorazedError';
    this.action = action || 'Faça o login novamente para continuar.';
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.details = details ?? [];
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}
