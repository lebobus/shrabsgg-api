import { HttpStatus } from '@nestjs/common';
import { DomainError, ErrorCodes } from 'src/common/domain';

export class InvalidPasswordError extends DomainError {
  constructor(searchCriteria?: SearchCriteria | null) {
    super(
      [
        {
          code: ErrorCodes.INVALID_PASSWORD,
          property: searchCriteria?.property,
        },
      ],
      `Invalid password.${
        searchCriteria
          ? ` Search criteria: ${JSON.stringify(searchCriteria.value)}`
          : ''
      }`,
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export interface SearchCriteria {
  property: string;
  value: string;
}
