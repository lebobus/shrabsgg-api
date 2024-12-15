export class Summoner {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;

  constructor(data: Partial<Summoner>) {
    Object.assign(this, data);
  }
}
