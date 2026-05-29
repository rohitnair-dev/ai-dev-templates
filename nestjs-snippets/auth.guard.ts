// auth.guard.ts
// Production-ready JWT Authentication Guard for NestJS
// Part of ai-dev-templates by Rohit Nair — github.com/rohitnair-dev
//
// Usage:
// @UseGuards(JwtAuthGuard)                    ← single route
// @UseGuards(JwtAuthGuard, RolesGuard)        ← with role check
// app.useGlobalGuards(new JwtAuthGuard())     ← global (main.ts)

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

// ── Decorator: mark routes as public (skip auth) ──────────────
import { SetMetadata } from '@nestjs/common';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// ── Decorator: attach roles to routes ─────────────────────────
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

// ── JWT Payload interface ──────────────────────────────────────
export interface JwtPayload {
  sub: string;        // user ID
  email: string;
  role: string;       // 'ADMIN' | 'USER' | 'GUEST'
  iat?: number;
  exp?: number;
}

// ── Auth Guard ─────────────────────────────────────────────────
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Check if route is marked @Public() — skip auth if so
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    // 2. Extract token from Authorization header
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('No authentication token provided');
    }

    // 3. Verify token
    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      // Distinguish expired vs invalid
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Authentication token has expired');
      }
      throw new UnauthorizedException('Invalid authentication token');
    }

    // 4. Attach user to request for downstream access
    // Access via: @Req() req — req.user
    request['user'] = payload;

    // 5. Check role requirements if @Roles() decorator present
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (requiredRoles && requiredRoles.length > 0) {
      const hasRole = requiredRoles.includes(payload.role);
      if (!hasRole) {
        throw new ForbiddenException(
          `Access denied. Required role: ${requiredRoles.join(' or ')}`,
        );
      }
    }

    return true;
  }

  // ── Extract Bearer token from Authorization header ───────────
  private extractToken(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) return null;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' && token ? token : null;
  }
}

// ── Roles Guard (separate, use alongside JwtAuthGuard) ────────
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user: JwtPayload = request.user;

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      throw new ForbiddenException(
        `Access denied. Required: ${requiredRoles.join(' or ')}, Found: ${user.role}`,
      );
    }

    return true;
  }
}

// ── Usage Examples ─────────────────────────────────────────────
//
// CONTROLLER LEVEL (all routes protected):
// @UseGuards(JwtAuthGuard)
// @Controller('profile')
// export class ProfileController { ... }
//
// ROUTE LEVEL (single route):
// @UseGuards(JwtAuthGuard)
// @Get('me')
// getProfile(@Req() req) { return req.user; }
//
// ADMIN ONLY:
// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles('ADMIN')
// @Delete(':id')
// deleteUser(@Param('id') id: string) { ... }
//
// PUBLIC ROUTE (skip auth even if global guard applied):
// @Public()
// @Get('health')
// healthCheck() { return { status: 'ok' }; }
//
// REGISTER IN MODULE:
// @Module({
//   imports: [JwtModule.register({ secret: process.env.JWT_SECRET })],
//   providers: [JwtAuthGuard, RolesGuard],
//   exports: [JwtAuthGuard, RolesGuard],
// })
// export class AuthModule {}
