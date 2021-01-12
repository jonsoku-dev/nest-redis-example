import { RankingDto } from './rankingDto';
import { BaseResponse } from './BaseResponse';

class RankingListDto {
  result: RankingDto[];
}

export class GetRankingListResponse extends BaseResponse(RankingListDto) {}
