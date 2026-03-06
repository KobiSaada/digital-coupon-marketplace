import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { ApiError, ErrorCode } from '../common/errors/api-error';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    const adminToken = process.env.ADMIN_TOKEN || 'admin123';

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(
        ErrorCode.UNAUTHORIZED,
        'Missing or invalid authorization header',
        401,
      );
    }

    const token = authHeader.substring(7);

    if (token !== adminToken) {
      throw new ApiError(ErrorCode.UNAUTHORIZED, 'Invalid admin token', 401);
    }

    return true;
  }
}
