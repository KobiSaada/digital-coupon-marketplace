import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { ApiError, ErrorCode } from '../common/errors/api-error';

@Injectable()
export class ResellerAuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(
        ErrorCode.UNAUTHORIZED,
        'Missing or invalid authorization header',
        401,
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!token) {
      throw new ApiError(ErrorCode.INVALID_TOKEN, 'Token is empty', 401);
    }

    // Find all active resellers
    const resellers = await this.prisma.reseller.findMany({
      where: { isActive: true },
    });

    // Check if token matches any reseller's hashed token
    let isValid = false;
    for (const reseller of resellers) {
      const matches = await bcrypt.compare(token, reseller.tokenHash);
      if (matches) {
        isValid = true;
        // Optionally attach reseller info to request
        (request as any).reseller = reseller;
        break;
      }
    }

    if (!isValid) {
      throw new ApiError(ErrorCode.UNAUTHORIZED, 'Invalid token', 401);
    }

    return true;
  }
}
