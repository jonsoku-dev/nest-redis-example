import { IsString, IsNumber } from 'class-validator';

export class CreateRankingRequest {
  @IsString()
  readonly username: string;
  @IsNumber()
  readonly score: number;
}