import { Exclude, Expose } from 'class-transformer';

export class PageInformations {
  @Exclude()
  private readonly _endCursor: null | string;
  @Exclude()
  private readonly _hasNextPage: boolean;
  @Exclude()
  private readonly _hasPreviousPage: boolean;
  @Exclude()
  private readonly _pages: number;
  @Exclude()
  private readonly _startCursor: null | string;
  @Exclude()
  private readonly _total: number;

  constructor(
    startCursor: null | string,
    endCursor: null | string,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    total: number,
    first: number,
  ) {
    this._endCursor = endCursor;
    this._hasNextPage = hasNextPage;
    this._hasPreviousPage = hasPreviousPage;
    this._startCursor = startCursor;
    this._total = total;

    this._pages =
      total % first > 0 ? Math.round(total / first) + 1 : total / first;
  }

  @Expose()
  get endCursor(): null | string {
    return this._endCursor;
  }
  @Expose()
  get hasNextPage(): boolean {
    return this._hasNextPage;
  }
  @Expose()
  get hasPreviousPage(): boolean {
    return this._hasPreviousPage;
  }
  @Expose()
  get pages(): number {
    return this._pages;
  }
  @Expose()
  get startCursor(): null | string {
    return this._startCursor;
  }
  @Expose()
  get total(): number {
    return this._total;
  }
}
