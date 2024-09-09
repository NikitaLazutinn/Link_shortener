import { Body, Controller, Get, Post, Redirect, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { createDto } from './dto/Create.dto';

@Controller('shorten')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}



  @Post()
  @UsePipes(new ValidationPipe())
  Link(@Body() createDto: createDto){
    return this.shortenerService.create(createDto);
  }

  @Get(':num')
  @Redirect()
  async redirect(@Param('num') num: number) {
    const link = await this.shortenerService.GetLink(num);
    return { url: link };
  }

  @Get('/stats/:num')
  async stats(@Param('num') num: number) {
    const stats = await this.shortenerService.getStatistic(num);
    return stats;
  }
}
