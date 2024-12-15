import { EntityManager } from '@mikro-orm/mongodb';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Result } from 'option-t/plain_result';
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
}
