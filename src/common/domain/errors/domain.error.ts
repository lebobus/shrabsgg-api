import { ErrorCodes } from './codes.error';

export class DomainError extends Error {
  constructor(
    public errorCodes: PropertyErrorCode[],
    public message: string,
    public httpCode?: number,
  ) {
    super();
  }
}

export interface PropertyErrorCode {
  code: ErrorCodes;
  property: string;
}
