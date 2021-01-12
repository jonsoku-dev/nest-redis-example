import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RankingDto } from './dto/rankingDto';
import { GetRankingListResponse } from './dto/getRankingListResponse';
import { CreateRankingRequest } from './dto/createRankingRequest';
import { CreateRankingResponse } from './dto/createRankingResponse';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RankService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async findAll(): Promise<GetRankingListResponse> {
    try {
      // parsing
      const result = JSON.parse(
        await this.cacheManager.get('rankings'),
      ) as RankingDto[];

      // get
      return {
        ok: true,
        result,
        totalCount: result.length,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async save({
    username,
    score,
  }: CreateRankingRequest): Promise<CreateRankingResponse> {
    try {
      // findAll
      const rankings: RankingDto[] = JSON.parse(
        await this.cacheManager.get('rankings'),
      );

      const newRanking = {
        id: uuidv4(),
        username,
        createdAt: new Date().getTime(),
        rank: 4,
        score,
      };

      // save
      rankings.push(newRanking);

      await this.cacheManager.set('rankings', JSON.stringify(rankings), {
        ttl: 1000,
      });

      return {
        ok: true,
        result: newRanking,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  private static getRandomScore(min, max) {
    return Math.random() * (max - min) + min;
  }
}
