import {Module} from '@nestjs/common';
import { CacheModule, CacheInterceptor} from '@nestjs/cache-manager';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import { MongooseModule } from '@nestjs/mongoose';
import { Links, LinksSchema } from './schemas/Links.schema';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from './shortener.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';


@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),

    MongooseModule.forFeature([
      {
        name: Links.name,
        schema: LinksSchema,
      },
  
    ]),

    ThrottlerModule.forRoot([{
      ttl: 10000,
      limit: 1,
    }])],

  controllers: [ShortenerController],
  providers: [
    ShortenerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class ShortenerModule {}
