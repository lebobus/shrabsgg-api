import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/common/application';
import { Result, andThenAsyncForResult, createOk } from 'option-t/plain_result';
import { ObjectId } from '@mikro-orm/mongodb';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create/create-user.dto';
import { UserAccount } from '../entities/user-account.entity';

@Injectable()
export class CreateUserUseCase extends UseCase<User> {
  private readonly logger: Logger = new Logger(CreateUserUseCase.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {
    super();
  }

  async execute(createUserDto: CreateUserDto): Promise<Result<User, Error>> {
    const userAccounts: UserAccount[] = [];
    for (const userAccount of createUserDto.accounts) {
      const newUserAccount = new UserAccount(
        new ObjectId(),
        userAccount.summonerId,
      );
      userAccounts.push(newUserAccount);
    }

    const userToCreate = new User(
      new ObjectId(),
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
      userAccounts,
      createUserDto.favoriteChampions,
    );

    return andThenAsyncForResult(
      this.userRepository.persist(userToCreate),
      async (user) => {
        return createOk(user);
      },
    );
  }
}
