import { ObjectId } from 'bson';

export class EntityId {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  public static create(value?: string): EntityId {
    if (value && !EntityId.isValid(value)) {
      throw new Error('Invalid ObjectId format.');
    }

    return new EntityId(value ?? new ObjectId().toString());
  }

  static isValid(value: string): boolean {
    // validation logic for ULID format
    return ObjectId.isValid(value);
  }

  equals(other: EntityId): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }

  get value(): string {
    return this._value;
  }
}
