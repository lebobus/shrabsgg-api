import { EntityManager } from '@mikro-orm/mongodb';
import { Controller, Get, Param } from '@nestjs/common';
import { RiotApiService } from '../services/riot-api.service';

@Controller('riot')
export class RiotController {
  constructor(
    private readonly em: EntityManager,
    private readonly riotApiService: RiotApiService,
  ) {}

  // @Get('/account/v1/accounts/by-riot-id')
  // test() {
  //   console.log('TEST');
  //   return this.riotApiService.getSummonerByRiotId({
  //     gameName: 'Discipline Difff',
  //     tagLine: '0812',
  //   });
  //   // return this.x.getRankBySummonerId(
  //   //   'kNWCc_gPmBniLwei1rfjtypca8XkqvGoEfYUrUMsrxH3W-G7rVCg4t6S_Q',
  //   // );
  // }

  @Get('/account/v1/accounts/by-riot-id/:gameName/:tagLine')
  async getAccountByRiotId(
    @Param('gameName') gameName: string,
    @Param('tagLine') tagLine: string,
  ) {
    return this.riotApiService.getSummonerByRiotId(gameName, tagLine);
  }

  @Get('/champions')
  async getChampions() {
    return this.riotApiService.getChampions();
  }
}
