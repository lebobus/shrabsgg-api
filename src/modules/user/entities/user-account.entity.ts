import { Property, EntityRepositoryType, Embeddable } from '@mikro-orm/core';
import { BaseEntity } from 'src/common/domain';
import { ObjectId } from '@mikro-orm/mongodb';
import { UserRepository } from '../repositories/user.repository';

@Embeddable()
export class UserAccount extends BaseEntity {
  [EntityRepositoryType]?: UserRepository;

  @Property()
  summonerId: string;

  constructor(id: ObjectId, summonerId: string) {
    super(id);

    this.summonerId = summonerId;
  }
}
