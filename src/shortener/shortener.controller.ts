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
    const link = await this.shortenerService.findLink(num);
    return { url: link };
  }

  // @Get(':num')
  // async O(@Param('num') num: number){
  //   const link = await this.shortenerService.findLink(num);
  //   return link;
  // }
}
