import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/common/application';
import {
  Result,
  andThenAsyncForResult,
  createErr,
  createOk,
} from 'option-t/plain_result';
import { Invite } from '../entities/invite.entity';
import { InviteRepository } from '../repositories/invite.repository';
import { ValidateInviteDto } from '../dtos/actions/validate-invite.dto';
import { InviteNotFoundError } from '../errors';
import { InvalidInviteCodeError } from '../errors/invalid-invite-code.error';
import { InviteAlreadyUsedError } from '../errors/invite-already-used.error';

@Injectable()
export class ValidateInviteUseCase extends UseCase<boolean> {
  private readonly logger: Logger = new Logger(ValidateInviteUseCase.name);

  constructor(
    @InjectRepository(Invite)
    private readonly inviteRepository: InviteRepository,
  ) {
    super();
  }

  async execute(
    validateInviteDto: ValidateInviteDto,
  ): Promise<Result<boolean, Error>> {
    return andThenAsyncForResult(
      await this.inviteRepository.findByEmail(validateInviteDto.email),
      async (invite) => {
        if (!invite) {
          return createErr(
            new InviteNotFoundError({
              property: 'email',
              value: validateInviteDto.email,
            }),
          );
        }

        if (invite.code == validateInviteDto.code) {
          if (invite.status == 'accepted') {
            return createErr(new InviteAlreadyUsedError());
          } else {
            return createOk(true);
          }
        } else {
          return createErr(new InvalidInviteCodeError());
        }
      },
    );
  }
}
