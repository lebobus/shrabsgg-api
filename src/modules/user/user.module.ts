import { Module } from '@nestjs/common';
import { OrmModule } from '../orm/orm.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { RiotModule } from '../riot/riot.module';
import { UserAccount } from './entities/user-account.entity';
import { Invite } from './entities/invite.entity';
import { InviteRepository } from './repositories/invite.repository';
import { InviteController } from './controllers/invite.controller';
import { CreateInviteUseCase } from './usecases/create-invite.usecase';
import { ValidateInviteUseCase } from './usecases/validate-invite.usecase';

@Module({
  imports: [
    OrmModule,
    RiotModule,
    MikroOrmModule.forFeature({
      entities: [User, UserAccount, Invite],
    }),
  ],
  controllers: [UserController, InviteController],
  providers: [
    UserRepository,
    InviteRepository,
    CreateUserUseCase,
    CreateInviteUseCase,
    ValidateInviteUseCase,
  ],
  exports: [UserRepository, InviteRepository],
})
export class UserModule {}
