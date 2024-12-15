import { IsDateString, IsEmail, IsString } from 'class-validator';

export class CreateInviteDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  code: string;

  @IsDateString()
  expiration: Date;

  @IsString()
  status: string;
}
