import { EntityRepository, MongoEntityManager } from '@mikro-orm/mongodb';
import { Injectable } from '@nestjs/common';
import {
  Result,
  tryCatchIntoResultWithEnsureError,
} from 'option-t/plain_result';
import { Race } from '../entities/race.entity';

@Injectable()
export class RaceRepository extends EntityRepository<Race> {
  public persist(race: Race): Result<Race, Error> {
    return tryCatchIntoResultWithEnsureError(() => {
      this.getEntityManager().fork().persistAndFlush(race);

      return race;
    });
  }

  public getFork(): MongoEntityManager {
    console.log('TRIGGERED');
    return this.getEntityManager().fork();
  }
}
