import { Entity, Property, EntityRepositoryType } from '@mikro-orm/core';
import { BaseEntity } from 'src/common/domain';
import { ObjectId } from '@mikro-orm/mongodb';
import { RaceRepository } from '../repositories/race.repository';

@Entity({ repository: () => RaceRepository })
export class RaceParticipant extends BaseEntity {
  [EntityRepositoryType]?: RaceRepository;

  @Property()
  summonerName: string;

  constructor(id: ObjectId, summonerName: string) {
    super(id);

    // this._id = id;
    this.summonerName = summonerName;
  }
}
