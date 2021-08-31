import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './http-exception.filter';
import { LoggerMiddleware } from './logger.middleware';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  // AppModuleでアプリ全体のインスタンスを作成
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);

  // 例外フィルターのグローバルスコープ
  // グローバルフィルターはベースフィルターを拡張できる
  // ここはモジュールの外部であり、モジュールのコンテキスト外で行われるため依存性を注入できない
  // この問題を解決するために、app.moduleの@Module()内にグローバルフィルターを登録できる
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // クラスは直で入れれないみたい
  // 単純な関数なら起動する
  // app.moduleで登録してるものと重複しても２回実行される
  app.use(LoggerMiddleware);

  // サーバー起動
  await app.listen(4000);
}

bootstrap();
