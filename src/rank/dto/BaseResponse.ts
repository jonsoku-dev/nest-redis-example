import { Type } from '@nestjs/common';

export function BaseResponse<T>(classRef: Type<T>): any {
  abstract class Response {
    ok: boolean;
    result: T;
    totalCount?: number;
  }
  return Response;
}
