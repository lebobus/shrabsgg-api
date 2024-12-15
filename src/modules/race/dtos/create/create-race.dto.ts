import { IsString } from 'class-validator';

export class CreateRaceDto {
  @IsString()
  RaceParticipantsIds: string;

  @IsString()
  startDate: Date;

  @IsString()
  endDate: Date;

  @IsString()
  gamesAmount: number;
}
