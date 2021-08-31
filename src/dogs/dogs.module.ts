import { Module } from '@nestjs/common';
import { CatsModule } from '../cats/cats.module';

@Module({
  // CatsModuleに依存している
  // CatsModuleで作ったモジュールも利用できる
  imports: [CatsModule],
})
export class DogsModule {}
