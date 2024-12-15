import { Module } from '@nestjs/common';
import { OrmModule } from '../orm/orm.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { Race } from './entities/race.entity';
import { RaceController } from './controllers/race.controller';
import { RaceRepository } from './repositories/race.repository';
import { RaceParticipant } from './entities/race-participant.entity';
import { CreateRaceUseCase } from './usecases/create-race.usecase';
import { RiotModule } from '../riot/riot.module';
import { FindAllRacesUseCase } from './usecases/find-all-races.usecase';

@Module({
  imports: [
    OrmModule,
    RiotModule,
    MikroOrmModule.forFeature({
      entities: [Race, RaceParticipant],
    }),
  ],
  controllers: [RaceController],
  providers: [RaceRepository, CreateRaceUseCase, FindAllRacesUseCase],
})
export class RaceModule {}
