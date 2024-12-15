import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/common/application';
import { Result, andThenAsyncForResult, createOk } from 'option-t/plain_result';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { ObjectId } from '@mikro-orm/mongodb';
import { Race } from '../entities/race.entity';
import { RaceRepository } from '../repositories/race.repository';
import { CreateRaceDto } from '../dtos/create/create-race.dto';
import { RaceParticipant } from '../entities/race-participant.entity';

@Injectable()
export class CreateRaceUseCase extends UseCase<Race> {
  private readonly logger: Logger = new Logger(CreateRaceUseCase.name);

  constructor(
    @InjectRepository(Race)
    private readonly raceRepository: RaceRepository,
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {
    super();
  }

  async execute(createRaceDto: CreateRaceDto): Promise<Result<Race, Error>> {
    const raceToCreate = new Race(
      new ObjectId(),
      [new RaceParticipant(new ObjectId(), 'Pop')],
      createRaceDto.startDate,
      createRaceDto.endDate,
      createRaceDto.gamesAmount,
      '123',
    );

    return andThenAsyncForResult(
      this.raceRepository.persist(raceToCreate),
      async (race) => {
        return createOk(race);
      },
    );
  }
}
