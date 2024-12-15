import { HttpStatus } from '@nestjs/common';
import { DomainError, ErrorCodes } from 'src/common/domain';

export class UserNotFoundError extends DomainError {
  constructor(searchCriteria?: SearchCriteria | null) {
    super(
      [{ code: ErrorCodes.USER_NOT_FOUND, property: searchCriteria?.property }],
      `User not found.${
        searchCriteria
          ? ` Search criteria: ${JSON.stringify(searchCriteria.value)}`
          : ''
      }`,
      HttpStatus.NOT_FOUND,
    );
  }
}

export interface SearchCriteria {
  property: string;
  value: string;
}