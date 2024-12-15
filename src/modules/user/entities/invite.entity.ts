import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/common/domain';
import { ObjectId } from '@mikro-orm/mongodb';
import { InviteRepository } from '../repositories/invite.repository';

@Entity({ repository: () => InviteRepository, collection: 'invites' })
export class Invite extends BaseEntity {
  @Property()
  email: string;

  @Property()
  code: string;

  @Property()
  expiration: Date;

  @Property()
  status: string; // e.g., 'pending', 'accepted', 'expired'

  constructor(
    id: ObjectId,
    email: string,
    code: string,
    expiration: Date,
    status: string,
  ) {
    super(id);

    // this._id = id;
    this.email = email;
    this.code = code;
    this.expiration = expiration;
    this.status = status;
  }
}
