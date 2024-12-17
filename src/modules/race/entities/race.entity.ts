import { Entity, Property, EntityRepositoryType } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/domain/entities/base.entity';
import { ObjectId } from '@mikro-orm/mongodb';
import { RaceRepository } from '../repositories/race.repository';
import { RaceParticipant } from './race-participant.entity';

@Entity({ repository: () => RaceRepository })
export class Race extends BaseEntity {
  [EntityRepositoryType]?: RaceRepository;

  @Property()
  participants: RaceParticipant[];

  @Property()
  startDate: Date;

  @Property()
  endDate: Date;

  @Property()
  gamesAmount: number;

  @Property()
  createdBy: string;

  constructor(
    id: ObjectId,
    participants: RaceParticipant[],
    startDate: Date,
    endDate: Date,
    gamesAmount: number,
    createdBy: string,
  ) {
    super(id);

    // this._id = id;
    this.participants = participants;
    this.startDate = startDate;
    this.endDate = endDate;
    this.gamesAmount = gamesAmount;
    this.createdBy = createdBy;
  }
}
