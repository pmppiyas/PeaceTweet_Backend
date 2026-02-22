export class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: string | number, message: string, stack?: string) {
    super(message);
    this.statusCode = Number(statusCode);

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
