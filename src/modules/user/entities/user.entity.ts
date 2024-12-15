import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/common/domain';
import { ObjectId } from '@mikro-orm/mongodb';
import { UserRepository } from '../repositories/user.repository';
import { UserAccount } from './user-account.entity';

@Entity({ repository: () => UserRepository })
export class User extends BaseEntity {
  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  password: string;

  @Property()
  imageUrl: string;

  @Property()
  accounts: UserAccount[];

  constructor(
    id: ObjectId,
    name: string,
    email: string,
    password: string,
    imageUrl: string,
    accounts: UserAccount[],
  ) {
    super(id);

    // this._id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.imageUrl = imageUrl;
    this.accounts = accounts;
  }
}
