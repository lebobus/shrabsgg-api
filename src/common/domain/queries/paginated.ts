import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum Order {
  Asc = 'ASC',
  Desc = 'DESC',
}

export class FindManyQuery {
  @IsString()
  @IsOptional()
  after?: string;

  @IsString()
  @IsOptional()
  before?: string;

  @IsNumber()
  first: number = 10;

  @IsString()
  @IsOptional()
  orderBy: string;

  @IsEnum(Order)
  @IsOptional()
  sort: Order;
}
