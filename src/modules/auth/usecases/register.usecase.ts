import { Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/common/application';
import {
  Result,
  andThenAsyncForResult,
  createErr,
  createOk,
} from 'option-t/plain_result';
import { User } from '../../user/entities/user.entity';
import { UserRepository } from '../../user/repositories/user.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { RegisterDto } from '../dtos/register.dto';
import { InviteRepository } from 'src/modules/user/repositories/invite.repository';
import { InviteNotFoundError } from 'src/modules/user/errors';
import { InvalidInviteCodeError } from 'src/modules/user/errors/invalid-invite-code.error';
import { UserAccount } from 'src/modules/user/entities/user-account.entity';
import { ObjectId } from '@mikro-orm/mongodb';
import { Invite } from 'src/modules/user/entities/invite.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUseCase extends UseCase<boolean> {
  private readonly logger: Logger = new Logger(RegisterUseCase.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,

    @InjectRepository(Invite)
    private readonly inviteRepository: InviteRepository,
  ) {
    super();
  }

  async execute(registerDto: RegisterDto): Promise<Result<boolean, Error>> {
    return andThenAsyncForResult(
      await this.inviteRepository.findByEmail(registerDto.email),
      async (invite) => {
        if (!invite) {
          return createErr(
            new InviteNotFoundError({
              property: 'email',
              value: registerDto.email,
            }),
          );
        }

        if (invite.code != registerDto.code) {
          return createErr(new InvalidInviteCodeError());
        }

        const userAccounts: UserAccount[] = [];
        for (const userAccount of registerDto.accounts) {
          const newUserAccount = new UserAccount(
            new ObjectId(),
            userAccount.summonerId,
          );
          userAccounts.push(newUserAccount);
        }

        return andThenAsyncForResult(
          await bcrypt
            .hash(registerDto.password, 10)
            .then(createOk)
            .catch(createErr),
          async (hashedPassword) => {
            const userToCreate = new User(
              new ObjectId(),
              registerDto.name,
              registerDto.email,
              hashedPassword,
              userAccounts,
              registerDto.favoriteChampions,
              'fafa',
            );

            return andThenAsyncForResult(
              this.userRepository.persist(userToCreate),
              async () => {
                return createOk(true);
              },
            );
          },
        );
      },
    );
  }
}
