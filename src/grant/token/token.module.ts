import { forwardRef, Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { JwtSecret } from '@/constants';
import { TokenService } from './token.service';
import { UserService } from '@/module/user/user.service';
import { TokenGuard } from './token.guard';

@Global()
@Module({
  imports: [JwtModule.register({ secret: JwtSecret })],
  providers: [JwtService, TokenService,TokenGuard],
  exports: [JwtService, TokenService,TokenGuard],
})
export class TokenModule {}
