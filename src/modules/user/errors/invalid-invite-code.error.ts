import { HttpStatus } from '@nestjs/common';
import { DomainError, ErrorCodes } from 'src/common/domain';

export class InvalidInviteCodeError extends DomainError {
  constructor(searchCriteria?: SearchCriteria | null) {
    super(
      [
        {
          code: ErrorCodes.INVALID_INVITE_CODE,
          property: searchCriteria?.property,
        },
      ],
      `Invalid invite code.${
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
