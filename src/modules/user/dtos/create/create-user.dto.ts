import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsString } from 'class-validator';
// import { UserAccount } from '../../entities/user-account.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  imageUrl: string;

  @IsArray()
  @Type(() => CreateUserAccountDto)
  accounts: CreateUserAccountDto[];
}

export class CreateUserAccountDto {
  @IsString()
  summonerId: string;
}
