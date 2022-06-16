import { Context, ErrorStatus, isHttpError, Status } from "../deps.ts";

export const notFound = (context: Context) => {
  context.response.status = Status.NotFound;
  context.response.body = `${context.request.url} not found.`;
};

export const errorHandler = async (context: Context, next: () => void) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      context.response.status = err.status;
      const { message, status } = err;
      if (context.request.accepts("json")) {
        context.response.body = { message, status };
        context.response.type = "json";
      } else {
        context.response.body = `${message}`;
        context.response.type = "text/plain";
      }
    } else {
      console.log(err);
      throw err;
    }
  }
};

export class CustomErrorHandler extends Error {
  statusCode: number;
  constructor(status: number, message: string) {
    super(message);
    this.statusCode = status;
  }
}

export const formatError = (
  error: Error | CustomErrorHandler,
): { status: ErrorStatus; message: string } => {
  let status = Status.InternalServerError as ErrorStatus;
  let message = error.message;

  if (error instanceof CustomErrorHandler) {
    status = error.statusCode;
    message = error.message;
  }
  return {
    status,
    message,
  };
};
