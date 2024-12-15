import { Body, Controller, Post } from '@nestjs/common';
import { Result } from 'option-t/plain_result';
import { Invite } from '../entities/invite.entity';
import { CreateInviteDto } from '../dtos/create/create-invite.dto';
import { CreateInviteUseCase } from '../usecases/create-invite.usecase';
import { ValidateInviteDto } from '../dtos/actions/validate-invite.dto';
import { ValidateInviteUseCase } from '../usecases/validate-invite.usecase';

@Controller('invites')
export class InviteController {
  constructor(
    private readonly validateInviteUseCase: ValidateInviteUseCase,
    private readonly createInviteUseCase: CreateInviteUseCase,
  ) {}

  @Post()
  async create(
    @Body() createInviteDto: CreateInviteDto,
  ): Promise<Result<Invite, Error>> {
    return await this.createInviteUseCase.execute({
      ...createInviteDto,
    });
  }

  @Post('/validate')
  async validate(
    @Body() validateInviteDto: ValidateInviteDto,
  ): Promise<Result<boolean, Error>> {
    return await this.validateInviteUseCase.execute({
      ...validateInviteDto,
    });
  }
}
