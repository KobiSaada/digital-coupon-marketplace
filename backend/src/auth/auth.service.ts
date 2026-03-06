import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export interface JwtPayload {
  sub: string;
  email?: string;
  role: 'admin' | 'reseller';
  name?: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * Admin Login with username/password
   */
  async loginAdmin(username: string, password: string): Promise<LoginResponse> {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (username !== adminUsername || password !== adminPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: 'admin',
      role: 'admin',
      name: 'Administrator',
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: 86400, // 24 hours in seconds
      token_type: 'Bearer',
    };
  }

  /**
   * Reseller authentication - supports both JWT and legacy Bearer tokens
   */
  async validateReseller(token: string): Promise<any> {
    try {
      // Try to verify as JWT first
      const decoded = this.jwtService.verify(token);
      if (decoded.role === 'reseller') {
        return decoded;
      }
      throw new UnauthorizedException('Invalid token role');
    } catch (jwtError) {
      // If JWT fails, try legacy Bearer token
      return this.validateLegacyResellerToken(token);
    }
  }

  /**
   * Legacy Bearer token validation (backwards compatibility)
   */
  private async validateLegacyResellerToken(token: string): Promise<any> {
    const resellers = await this.prisma.reseller.findMany({
      where: { isActive: true },
    });

    for (const reseller of resellers) {
      const matches = await bcrypt.compare(token, reseller.tokenHash);
      if (matches) {
        return {
          sub: reseller.id,
          role: 'reseller',
          name: reseller.name,
          isLegacyToken: true,
        };
      }
    }

    throw new UnauthorizedException('Invalid token');
  }

  /**
   * Generate JWT token for reseller
   */
  async generateResellerToken(resellerId: string): Promise<LoginResponse> {
    const reseller = await this.prisma.reseller.findUnique({
      where: { id: resellerId },
    });

    if (!reseller || !reseller.isActive) {
      throw new UnauthorizedException('Reseller not found or inactive');
    }

    const payload: JwtPayload = {
      sub: reseller.id,
      role: 'reseller',
      name: reseller.name,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      expires_in: 86400,
      token_type: 'Bearer',
    };
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const payload: JwtPayload = {
        sub: decoded.sub,
        role: decoded.role,
        name: decoded.name,
        email: decoded.email,
      };

      const accessToken = this.jwtService.sign(payload);

      return {
        access_token: accessToken,
        expires_in: 86400,
        token_type: 'Bearer',
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /**
   * Validate JWT token
   */
  async validateToken(token: string): Promise<JwtPayload> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
