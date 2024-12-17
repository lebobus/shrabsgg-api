import { HttpStatus } from '@nestjs/common';
import { DomainError, ErrorCodes } from 'src/common/domain';

export class InviteAlreadyUsedError extends DomainError {
  constructor(searchCriteria?: SearchCriteria | null) {
    super(
      [
        {
          code: ErrorCodes.INVITE_ALERADY_USED,
          property: searchCriteria?.property,
        },
      ],
      `Invite already used.${
        searchCriteria
          ? ` Search criteria: ${JSON.stringify(searchCriteria.value)}`
          : ''
      }`,
      HttpStatus.ACCEPTED,
    );
  }
}

export interface SearchCriteria {
  property: string;
  value: string;
}
