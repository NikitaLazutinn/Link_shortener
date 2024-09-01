import { Module } from '@nestjs/common';
import { ShortenerModule } from './shortener/shortener.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ShortenerModule, MongooseModule.forRoot('mongodb://localhost:27017'),
    ShortenerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
