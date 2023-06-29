import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpCode,
  Header,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Request, Response } from 'express';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  findAll(@Req() req: Request, @Res() res: Response) {
    // const reqs = req.headers.host;
    res.status(HttpStatus.OK).json({
      code: 200,
      success: true,
      data: {
        res: this.catsService.findAll(),
      },
    });
    // return reqs + this.catsService.findAll();
  }

  @Get(':id')
  // 在路由参数传过来的都是string
  findOne(@Param('id') id: string) {
    console.log(id);
    console.log(typeof id);
    return this.catsService.findOne(+id);
  }
  @Get('/users/:username/posts/:postId')
  getSth(@Param('username') username: string, @Param('postId') postId: string) {
    return username + postId;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
