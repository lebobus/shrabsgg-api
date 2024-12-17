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
  accounts: UserAccount[];

  @Property()
  favoriteChampions: UserFavoriteChampion[];

  @Property()
  imageUrl?: string | null;

  constructor(
    id: ObjectId,
    name: string,
    email: string,
    password: string,
    accounts: UserAccount[],
    favoriteChampions: UserFavoriteChampion[],
    imageUrl?: string | null,
  ) {
    super(id);

    // this._id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.accounts = accounts;
    this.favoriteChampions = favoriteChampions;
    this.imageUrl = imageUrl;
  }
}

export interface UserFavoriteChampion {
  name: string;
}
