import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './dto';
import { CatsService } from './cats.service';
import { ForbiddenException } from '../forbidden.exception';
import { HttpExceptionFilter } from '../http-exception.filter';

// import { Cat } from './interfaces/cat.interface';

// 例外フィルターのコントローラースコープ
@UseFilters(new HttpExceptionFilter())
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<string> {
    // return this.catsService.findAll();

    // 例外スローができる
    // HttpExceptionコンストラクタは、２つの引数を受け取ることができる
    // 第一引数はレスポンスボディを含め、stringまたはjsonを渡すことができる
    // 第二引数はHTTPステータスコード
    throw new ForbiddenException();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `success!! GET #${id} cat`;
  }

  @Post()
  // 例外フィルターのメソッドスコープ
  // インスタンスを入れる
  // @UseFilters(new HttpExceptionFilter())
  // インスタンスをフレームワークに任せる ←こっちの方がメモリ使用量が削減できる
  @UseFilters(HttpExceptionFilter)
  async create(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException();
    // this.catsService.create(createCatDto);
    // return 'success!! POST cat';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `success!! PUT #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `success!! DELETE #${id} cat`;
  }
}
