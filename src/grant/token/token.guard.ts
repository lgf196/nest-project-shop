import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { awaitWrap, resStatusCode } from '@/utils/index';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JwtSecret } from '@/constants';
import { TokenService } from './token.service';
@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private Reflector: Reflector,
    private readonly JwtService: JwtService,
    private readonly TokenService: TokenService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const token = req.headers.accesstoken as string;
    if (!token) {
      throw new UnauthorizedException({
        code: resStatusCode.noLogin,
        message: '未登录，请登录',
        data: null,
      });
    }
    try {
      const userInfo = this.JwtService.verify(token, {
        secret: JwtSecret,
      });
    } catch (error) {
      throw new UnauthorizedException({
        code: resStatusCode.noLogin,
        message: '登录失效，请登录',
        data: null,
      });
    };
    // 一个账号只能在同一个设备中进行登录
    const isValid = this.TokenService.validActiveTokens(token);
    if(!isValid){
      throw new UnauthorizedException({
        code: resStatusCode.noLogin,
        message: '已在其它地方登录，请重新登录',
        data: null,
      });
    }
    return true;
  }
}