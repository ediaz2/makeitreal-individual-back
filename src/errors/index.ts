export class HttpException extends Error {
  status: number;
  scope?: string;
  constructor(status: number, message: string, scope?: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.scope = scope;
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string, scope?: string) {
    super(400, message, scope);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string, scope?: string) {
    super(401, message, scope);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string, scope?: string) {
    super(404, message, scope);
  }
}
