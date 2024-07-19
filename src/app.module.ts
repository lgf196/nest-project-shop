import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { ProductModule } from './module/product/product.module';
import { PrismaModule } from '@/db/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config'; // 读取.env文件里面的变量的
import SessionMi from '@/middleware/session.middleware';
import { UserController } from './module/user/user.controller';
import { FileModule } from './module/file/file.module';
import { TokenModule } from './grant/token/token.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    TokenModule,
    UserModule,
    ProductModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(SessionMi).forRoutes(UserController);
//   }
// }
