import { Exclude, Expose, Transform } from 'class-transformer';

import { Metadata } from '../value-objects/metadata.vo';
import { Entity, PrimaryKey } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

@Entity()
export abstract class BaseEntity {
  @Exclude()
  @PrimaryKey()
  protected _id!: ObjectId;

  @Exclude()
  protected _metadata?: Metadata;

  protected constructor(id: ObjectId) {
    this._id = id;
  }

  public setMetadata(metadata: Metadata) {
    this._metadata = metadata;
  }

  @Transform(({ value }) => value.value, { toClassOnly: false })
  @Expose({ name: 'id' })
  get id(): ObjectId {
    return this._id;
  }

  @Expose()
  get metadata(): Metadata | undefined {
    return this._metadata;
  }
}

// todo created / updated in metadata value object
