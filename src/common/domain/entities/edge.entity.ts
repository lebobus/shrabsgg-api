import { Exclude, Expose } from 'class-transformer';

export class Edge<T> {
  @Exclude()
  private readonly _cursor: string;

  @Exclude()
  private readonly _node: T;

  constructor(cursor: string, node: T) {
    this._cursor = cursor;
    this._node = node;
  }

  @Expose()
  get cursor(): string {
    return this._cursor;
  }

  @Expose()
  get node(): T {
    return this._node;
  }
}
