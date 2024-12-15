import { EntityManager } from '@mikro-orm/mongodb';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRaceDto } from '../dtos/create/create-race.dto';
import { Race } from '../entities/race.entity';
import { Result } from 'option-t/plain_result';
import { CreateRaceUseCase } from '../usecases/create-race.usecase';
import { RiotApiService } from 'src/modules/riot/services/riot-api.service';
import { FindAllRacesUseCase } from '../usecases/find-all-races.usecase';
// import { RiotApiService } from 'src/common/domain';

@Controller('races')
export class RaceController {
  constructor(
    private readonly em: EntityManager,
    private readonly createRaceUseCase: CreateRaceUseCase,
    private readonly findAllRacesUseCase: FindAllRacesUseCase,
    private readonly x: RiotApiService,
  ) {}

  @Get()
  test() {
    return this.findAllRacesUseCase.execute();
    // return this.x.getRankBySummonerId(
    //   'kNWCc_gPmBniLwei1rfjtypca8XkqvGoEfYUrUMsrxH3W-G7rVCg4t6S_Q',
    // );
  }

  @Post()
  async create(
    @Body() createRaceDto: CreateRaceDto,
  ): Promise<Result<Race, Error>> {
    return await this.createRaceUseCase.execute({
      ...createRaceDto,
    });
  }
}
