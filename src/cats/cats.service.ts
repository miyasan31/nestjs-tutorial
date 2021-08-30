import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): string {
    return `success!! GET ${this.cats.length !== 0 ? this.cats : 'no'} cats`;
  }
}
