import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  // CatsControllerに依存している
  controllers: [CatsController],
  // CatsServiceに依存している
  providers: [CatsService],
  // CatsModuleの依存先でCatsServiceを利用する
  exports: [CatsService],
})
export class CatsModule {}
