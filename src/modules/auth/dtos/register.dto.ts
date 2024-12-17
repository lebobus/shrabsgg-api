import { IsArray, IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  password: string;

  @IsArray()
  favoriteChampions: Array<any>;

  @IsArray()
  accounts: Array<any>;
}
