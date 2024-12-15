import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/common/application';
import { Result, andThenAsyncForResult, createOk } from 'option-t/plain_result';
import { ObjectId } from '@mikro-orm/mongodb';
import { Invite } from '../entities/invite.entity';
import { InviteRepository } from '../repositories/invite.repository';
import { CreateInviteDto } from '../dtos/create/create-invite.dto';

@Injectable()
export class CreateInviteUseCase extends UseCase<Invite> {
  private readonly logger: Logger = new Logger(CreateInviteUseCase.name);

  constructor(
    @InjectRepository(Invite)
    private readonly inviteRepository: InviteRepository,
  ) {
    super();
  }

  async execute(
    createInviteDto: CreateInviteDto,
  ): Promise<Result<Invite, Error>> {
    const inviteToCreate = new Invite(
      new ObjectId(),
      createInviteDto.email,
      createInviteDto.code,
      createInviteDto.expiration,
      createInviteDto.status,
    );

    return andThenAsyncForResult(
      this.inviteRepository.persist(inviteToCreate),
      async (invite) => {
        return createOk(invite);
      },
    );
  }
}
