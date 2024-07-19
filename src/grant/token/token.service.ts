import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  HttpException,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JwtSecret } from '@/constants';
import { user } from '@prisma/client';
@Injectable()
export class TokenService {
  // 存储用户 ID 和 Token 的映射，用来实现个账号同时只能登录一个客户端
  private activeTokens: Map<string, string>;
  constructor(private readonly JwtService: JwtService) {
    this.activeTokens = new Map();
  }
  createToken(payload: Pick<user, 'id' | 'userName'>) {
    return this.JwtService.sign(payload, { expiresIn: 360, secret: JwtSecret });
  }
  setActiveTokens(userId: string, token: string) {
    this.activeTokens.set(userId, token);
  }
  deleteActiveTokens(userId: string) {
    this.activeTokens.delete(userId);
  }
  validActiveTokens(token: string):boolean {
    for (const [userId, activeToken] of this.activeTokens.entries()) {
      if (token === activeToken) {
        return true;
      }
    }
    return false;
  }

}
