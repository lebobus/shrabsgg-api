import { Injectable, NotFoundException } from '@nestjs/common';
import { AxiosResponse } from 'axios';

import { HttpService } from '@nestjs/axios';
import { Summoner } from '../domain/entities/summoner.entity';
import { Champion } from '../domain/entities/champion.entity';
import * as path from 'path';
import * as fs from 'fs';

//discipline diff
//puuid
// ZQbNCookJK8_OkfinccsPpZPBsdlNxUy2c0Dtop-rffxdTRE942-3U3rNBFQ71r7XmTDTq-M6MbEHA

// summonerId
//kNWCc_gPmBniLwei1rfjtypca8XkqvGoEfYUrUMsrxH3W-G7rVCg4t6S_Q
const API_KEY = 'RGAPI-0e32c45e-3ea3-44ed-afd4-8da6b6fcc09b';
@Injectable()
export class RiotApiService {
  private readonly baseUrl = 'https://na1.api.riotgames.com';

  constructor(private readonly httpService: HttpService) {}

  async getSummonerById(): Promise<Summoner> {
    try {
      const link =
        'https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/Discipline%20Diff/0812';
      const response: AxiosResponse<any> = await this.httpService
        .get(link, {
          headers: {
            'X-Riot-Token': API_KEY,
          },
        })
        .toPromise();

      return new Summoner(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException('Summoner not found');
      }
      throw error;
    }
  }

  async getSummonerByRiotId(gameName: string, tagLine: string) {
    try {
      const response: AxiosResponse<any> = await this.httpService
        .get(
          `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
          {
            headers: {
              'X-Riot-Token': API_KEY,
            },
          },
        )
        .toPromise();
      console.log(response);

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException('Summoner not found');
      }
      throw error;
    }
  }

  async getRankBySummonerId(summonerId: string) {
    //https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/kNWCc_gPmBniLwei1rfjtypca8XkqvGoEfYUrUMsrxH3W-G7rVCg4t6S_Q?api_key=RGAPI-f2a6a945-6888-4214-bdfc-21d4c6d72430
    try {
      const response: AxiosResponse<any> = await this.httpService
        .get(
          `${this.baseUrl}/lol/league/v4/entries/by-summoner/${summonerId}`,
          {
            headers: {
              'X-Riot-Token': API_KEY,
            },
          },
        )
        .toPromise();

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException('Summoner not found');
      }
      throw error;
    }
  }

  async getChampions(): Promise<Champion[]> {
    const fileContent = await fs.promises.readFile(
      path.join(process.cwd(), 'src/modules/riot/domain/common/champions.json'),
      'utf-8',
    );
    const data = JSON.parse(fileContent);

    //const champions: Champion[] = [];

    //Object.values(data.data).forEach((championData: Partial<Champion>) => {
    //  champions.push(new Champion(championData));
    //});

    return data;
  }
  // async getChampionss(): Promise<Champion[]> {
  //   try {
  //     await fetch('../domain/common/champions.json');
  //     // const data = await response.json();
  //     // const champions = data.data;
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   // return champions.map(
  //   //   (championData: Partial<Champion>) => new Champion(championData),
  //   // );
  // }
}
