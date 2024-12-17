import { Module } from '@nestjs/common';
import { OrmModule } from '../orm/orm.module';

import { LoginUseCase } from './usecases/login.usecase';
import { LoginController } from './controller/login.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../user/entities/user.entity';
import { RegisterController } from './controller/register.controller';
import { RegisterUseCase } from './usecases/register.usecase';
import { Invite } from '../user/entities/invite.entity';

@Module({
  imports: [
    UserModule,
    OrmModule,
    MikroOrmModule.forFeature({
      entities: [User, Invite],
    }),
  ],
  controllers: [LoginController, RegisterController],
  providers: [LoginUseCase, RegisterUseCase, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
