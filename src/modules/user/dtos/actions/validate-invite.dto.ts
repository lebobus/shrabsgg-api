import { IsEmail, IsString } from 'class-validator';

export class ValidateInviteDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  code: string;
}
