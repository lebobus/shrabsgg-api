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
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserNotFoundError } from '../errors';
@Injectable()
export class LoginUseCase extends UseCase<User> {
  private readonly logger: Logger = new Logger(LoginUseCase.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async execute(loginDto: LoginDto): Promise<Result<User, Error>> {
    return andThenAsyncForResult(
      await this.userRepository.existByEmail(loginDto.email),
      async (existingUser) => {
        if (!existingUser) {
          return createErr(
            new UserNotFoundError({ property: 'email', value: loginDto.email }),
          );
        }

        return andThenAsyncForResult(
          await this.authService.verifyPassword(
            loginDto.email,
            loginDto.password,
          ),
          async (user) => {
            console.log(user);

            return createOk(user);
          },
        );
      },
    );
  }
}
