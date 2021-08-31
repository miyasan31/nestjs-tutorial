import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// src > app.service.ts
// @Injectable()
// export class AppService {
//   getHello(): string {
//     return 'Hello World! みやさん';
//   }
// }

@Controller() // "/"
export class AppController {
  // AppServiceを'this.appService'としてこのクラス内で使うことができる
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // 'this.appService'はAppServiceと同じ
    return this.appService.getHello();
  }
}
