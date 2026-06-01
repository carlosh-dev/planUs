export type BaseErrorType = {
  message?: string;
  cause?: unknown;
  action?: string;
  statusCode?: number;
};

export class InternalServerError extends Error {
  action: string;
  statusCode: number;

  constructor(
    message: string,
    { cause, action, statusCode }: BaseErrorType = {},
  ) {
    super(message, { cause });
    this.name = new.target.name; // pega o nome da subclasse automaticamente
    this.action = action ?? 'Entre em contato com o suporte.';
    this.statusCode = statusCode ?? 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
    };
  }
}

export class ServiceError extends Error {
  action: string;
  statusCode: number;

  constructor({ cause, message }: BaseErrorType = {}) {
    super(message || 'Serviço indisponivel no momento.', {
      cause,
    });
    this.name = 'ServiceError';
    this.action = 'Verifique se o serviço está disponível.';
    this.statusCode = 503;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
    };
  }
}

export class MethodNotAllowedError extends Error {
  action: string;
  statusCode: number;

  constructor() {
    super('Método não permitido para este endpoint.');
    this.name = 'MethodNotAllowedError';
    this.action =
      'Verifique se o método HTTP enviado é válido para este endpoint.';
    this.statusCode = 405;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
    };
  }
}

export class ValidationError extends Error {
  action: string;
  statusCode: number;

  constructor({ cause, message, action }: BaseErrorType = {}) {
    super(message || 'Um erro de validação ocorreu.', {
      cause,
    });
    this.name = 'ValidationError';
    this.action = action || 'Ajuste os dados eviados e tente novamente.';
    this.statusCode = 400;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
    };
  }
}

export class NotFoundError extends Error {
  action: string;
  statusCode: number;

  constructor({ cause, message, action }: BaseErrorType = {}) {
    super(message || 'Recurso não encontrado.', {
      cause,
    });
    this.name = 'NotFoundError';
    this.action =
      action ||
      'Verifique se os paremetros enviados na consulta estão corretos.';
    this.statusCode = 404;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
    };
  }
}

export class UnauthorazedError extends Error {
  action: string;
  statusCode: number;

  constructor({ cause, message, action }: BaseErrorType = {}) {
    super(message || 'Usuário não autenticado.', {
      cause,
    });
    this.name = 'UnauthorazedError';
    this.action = action || 'Faça o login novamente para continuar.';
    this.statusCode = 401;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
    };
  }
}
