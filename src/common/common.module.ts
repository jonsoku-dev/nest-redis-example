import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggingMiddleware } from './middleware/loggingMiddleware';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/apiKeyGuard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
