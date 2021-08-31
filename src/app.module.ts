import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DogsController } from './dogs/dogs.controller';
import { DogsService } from './dogs/dogs.service';
import { DogsModule } from './dogs/dogs.module';
import { LoggerMiddleware } from './logger.middleware';
import { APP_FILTER } from '@nestjs/core';
// import { HttpExceptionFilter } from './http-exception.filter';
import { AllExceptionsFilter } from './all-exceptions.filter';

@Module({
  // CatsModuleとDogsModuleに依存している
  imports: [CatsModule, DogsModule],
  // AppControllerとDogsControllerに依存している
  controllers: [AppController, DogsController],
  // AppServiceとDogsServiceに依存している
  providers: [
    AppService,
    DogsService,
    // ここでグローバルな例外フィルターを登録
    // main.tsでグローバルフィルターを拡張してるのでやらなくてもいい
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // '/cats'ルートにLoggerMiddlewareを登録
    // consumer.apply(LoggerMiddleware).forRoutes('cats');
    // '/dogs'ルートにも登録できる
    // consumer.apply(LoggerMiddleware).forRoutes('dogs');
    // 上記二つをまとめることもできる！！！！

    consumer
      // apply()も複数のミドルウェアを登録できる
      // 順次実行する順番にミドルウェアを登録すると良い！！
      // .apply(cors(), helmet(), LoggerMiddleware)
      .apply(LoggerMiddleware)
      // exclude()は除外するルートを登録できる
      .exclude
      // { path: 'cats', method: RequestMethod.POST },
      //  'cats/(.*)'
      ()
      .forRoutes(
        // 特定のリクエストメソッドを登録できる（GETリクエストを登録）
        { path: 'cats', method: RequestMethod.ALL },
        // ワイルドカードのルートも登録できる（全てのリクエストを登録）
        { path: 'do*gs', method: RequestMethod.GET },
      );
  }
}
