import { Module } from '@nestjs/common';
import { OrmModule } from '../orm/orm.module';

import { LoginUseCase } from './usecases/login.usecase';
import { LoginController } from './controller/login.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    UserModule,
    OrmModule,
    MikroOrmModule.forFeature({
      entities: [User],
    }),
  ],
  controllers: [LoginController],
  providers: [LoginUseCase, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
