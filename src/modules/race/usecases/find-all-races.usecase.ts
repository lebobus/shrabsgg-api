import { Injectable } from '@nestjs/common';

import { Race } from '../entities/race.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { RaceRepository } from '../repositories/race.repository';
import { UseCase } from 'src/common/application';
import { createErr, createOk, Result } from 'option-t/plain_result';

@Injectable()
export class FindAllRacesUseCase extends UseCase<Race[]> {
  constructor(
    @InjectRepository(Race)
    private readonly raceRepository: RaceRepository,
  ) {
    super();
  }

  async execute(): Promise<Result<Race[], Error>> {
    try {
      const fork = this.raceRepository.getFork();
      const races = await fork.find(Race, {});
      return createOk(races);
    } catch (error) {
      console.log('err', error);
      return createErr(error);
    }
  }
}
