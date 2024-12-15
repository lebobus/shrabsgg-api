import { DomainError, ErrorCodes } from 'src/common/domain';

export class DuplicateTournamentNameError extends DomainError {
  constructor() {
    super(
      [{ code: ErrorCodes.DUPLICATE_TOURNAMENT_NAME, property: 'name' }],
      'A tournament with this name already exists.',
    );
  }
}
