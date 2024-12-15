import { EntityRepository, MongoEntityManager } from '@mikro-orm/mongodb';
import { Injectable } from '@nestjs/common';
import {
  andThenForResult,
  createOk,
  Result,
  tryCatchIntoResultWithEnsureError,
  tryCatchIntoResultWithEnsureErrorAsync,
} from 'option-t/plain_result';
import { Invite } from '../entities/invite.entity';

@Injectable()
export class InviteRepository extends EntityRepository<Invite> {
  public persist(invite: Invite): Result<Invite, Error> {
    return tryCatchIntoResultWithEnsureError(() => {
      this.getEntityManager().fork().persistAndFlush(invite);

      return invite;
    });
  }

  public getFork(): MongoEntityManager {
    return this.getEntityManager().fork();
  }

  async findByEmail(email: string): Promise<Result<null | Invite, Error>> {
    return tryCatchIntoResultWithEnsureErrorAsync(async () => {
      const document = await this.getFork().findOne(Invite, { email: email });

      if (!document) {
        return null;
      }

      return document;
    });
  }

  async findByCode(code: string): Promise<Result<null | Invite, Error>> {
    return tryCatchIntoResultWithEnsureErrorAsync(async () => {
      const document = await this.getFork().findOne(Invite, { code: code });

      if (!document) {
        return null;
      }

      return document;
    });
  }

  async existByCode(code: string): Promise<Result<boolean, Error>> {
    return andThenForResult(await this.findByCode(code), (entity) =>
      createOk(!!entity),
    );
  }
}
