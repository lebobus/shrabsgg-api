import { ObjectId } from '@mikro-orm/mongodb';
import { Race } from '../entities/race.entity';

export interface RacetRepositoryInterface {
  _create(tournament: Race): Promise<Race>;
  existByName(name: string): Promise<boolean>;
  _findAll(): Promise<Race[]>;
  findById(tournamentId: ObjectId): Promise<Race>;
  findByName(name: string): Promise<Race>;
  //   update(tournament: Tournament): Promise<Tournament>;
}
