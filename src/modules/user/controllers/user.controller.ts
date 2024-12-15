import { EntityManager } from '@mikro-orm/mongodb';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Result } from 'option-t/plain_result';
import { CreateUserUseCase } from '../usecases/create-user.usecase';
import { RiotApiService } from 'src/modules/riot/services/riot-api.service';
import { CreateUserDto } from '../dtos/create/create-user.dto';
import { User } from '../entities/user.entity';
// import { RiotApiService } from 'src/common/domain';

@Controller('users')
export class UserController {
  constructor(
    private readonly em: EntityManager,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly x: RiotApiService,
  ) {}

  @Get()
  test() {
    return 'alo';
  }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Result<User, Error>> {
    console.log(createUserDto); // Log the full object to verify transformation

    return await this.createUserUseCase.execute({
      ...createUserDto,
    });
  }
}
