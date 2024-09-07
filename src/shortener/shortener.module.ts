import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import { MongooseModule } from '@nestjs/mongoose';
import { Links, LinksSchema } from './schemas/Links.schema';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from './shortener.service';


@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      socket: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MongooseModule.forFeature([
      {
        name: Links.name,
        schema: LinksSchema,
      },
  
    ])],
  controllers: [ShortenerController],
  providers: [
    ShortenerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class ShortenerModule {}
