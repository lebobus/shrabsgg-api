import { Module } from '@nestjs/common';
import { OrmModule } from '../orm/orm.module';
// import { MikroOrmModule } from '@mikro-orm/nestjs';

import { RiotApiService } from './services/riot-api.service';
// import { Summoner } from './domain/entities/summoner.entity';
import { HttpModule } from '@nestjs/axios';
import { RiotController } from './controllers/riot.controller';
// import { RiotApiService } from '../riot/services/riot-api.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    OrmModule,
  ],
  controllers: [RiotController],
  providers: [RiotApiService],
  exports: [RiotApiService],
})
export class RiotModule {}
