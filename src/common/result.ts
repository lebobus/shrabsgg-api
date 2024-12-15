import { DomainError } from './domain/errors/domain.error';

export class Result<T> {
  constructor(
    public value?: T,
    public error?: DomainError,
  ) {}

  static failure<T>(error: DomainError): Result<T> {
    return new Result<T>(undefined, error);
  }

  static success<T>(value: T): Result<T> {
    return new Result<T>(value);
  }

  isError(): boolean {
    return !!this.error;
  }

  isSuccess(): boolean {
    return !this.error;
  }
}
