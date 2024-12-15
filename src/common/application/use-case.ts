import { Result } from 'option-t/plain_result';

export abstract class UseCase<T> {
  abstract execute(...args: any[]): Promise<Result<T, Error>>;
}
