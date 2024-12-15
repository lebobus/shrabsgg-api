import { EntityRepository, MongoEntityManager } from '@mikro-orm/mongodb';
import { Injectable } from '@nestjs/common';
import {
  andThenForResult,
  createOk,
  Result,
  tryCatchIntoResultWithEnsureError,
  tryCatchIntoResultWithEnsureErrorAsync,
} from 'option-t/plain_result';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends EntityRepository<User> {
  public persist(user: User): Result<User, Error> {
    return tryCatchIntoResultWithEnsureError(() => {
      this.getEntityManager().fork().persistAndFlush(user);

      return user;
    });
  }

  public getFork(): MongoEntityManager {
    return this.getEntityManager().fork();
  }

  async findByEmail(email: string): Promise<Result<null | User, Error>> {
    return tryCatchIntoResultWithEnsureErrorAsync(async () => {
      const document = await this.getFork().findOne(User, { email: email });

      if (!document) {
        return null;
      }

      return document;
    });
  }

  async existByEmail(email: string): Promise<Result<boolean, Error>> {
    return andThenForResult(await this.findByEmail(email), (entity) =>
      createOk(!!entity),
    );
  }
}
