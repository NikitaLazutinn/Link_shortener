import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Links, LinksSchema } from './schemas/Links.schema';
import { ShortenerService } from './shortener.service';
import { ShortenerController } from './shortener.controller';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Links.name,
      schema: LinksSchema,
    },

  ])],
  controllers: [ShortenerController],
  providers: [ShortenerService],
})
export class ShortenerModule {}
