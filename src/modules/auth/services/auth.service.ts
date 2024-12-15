import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import {
  andThenAsyncForResult,
  createErr,
  createOk,
  Result,
} from 'option-t/plain_result';
import { User } from 'src/modules/user/entities/user.entity';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { InvalidPasswordError } from '../errors/invalid-password.error';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async verifyPassword(
    email: string,
    plainPassword: string,
  ): Promise<Result<User, Error>> {
    return andThenAsyncForResult(
      await this.userRepository.findByEmail(email),
      async (existingUser) => {
        const valid = await bcrypt.compare(
          plainPassword,
          existingUser.password,
        );

        if (valid) {
          return createOk(existingUser);
        } else {
          return createErr(new InvalidPasswordError());
        }
      },
    );
  }
}
