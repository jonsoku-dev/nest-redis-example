import { Body, Controller, Get, Post } from '@nestjs/common';
import { RankService } from './rank.service';
import { GetRankingListResponse } from './dto/getRankingListResponse';
import { CreateRankingResponse } from './dto/createRankingResponse';
import { CreateRankingRequest } from './dto/createRankingRequest';

@Controller('/api/v1/rank')
export class RankController {
  constructor(private rankService: RankService) {}

  @Get('/')
  getRankingList(): Promise<GetRankingListResponse> {
    return this.rankService.findAll();
  }

  @Post('/')
  createRanking(
    @Body() createRankingRequest: CreateRankingRequest,
  ): Promise<CreateRankingResponse> {
    return this.rankService.save(createRankingRequest);
  }
}
