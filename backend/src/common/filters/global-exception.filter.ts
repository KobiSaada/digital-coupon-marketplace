import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiError, ErrorCode } from '../errors/api-error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = ErrorCode.INTERNAL_ERROR;
    let message = 'Internal server error';

    if (exception instanceof ApiError) {
      statusCode = exception.statusCode;
      errorCode = exception.errorCode;
      message = exception.message;
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      // Handle Unauthorized specifically
      if (statusCode === HttpStatus.UNAUTHORIZED) {
        errorCode = ErrorCode.UNAUTHORIZED;
        message = 'Unauthorized';
      } else if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
        const msg = (exceptionResponse as any).message;
        message = Array.isArray(msg)
          ? msg.join(', ')
          : String(msg);
        errorCode = ErrorCode.VALIDATION_ERROR;
      } else {
        message = exception.message;
        errorCode = ErrorCode.VALIDATION_ERROR;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    console.error('Error:', {
      errorCode,
      message,
      statusCode,
      stack: exception instanceof Error ? exception.stack : undefined,
    });

    response.status(statusCode).json({
      error_code: errorCode,
      message,
    });
  }
}
