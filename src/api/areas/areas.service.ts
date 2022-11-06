import { Injectable } from '@nestjs/common';

@Injectable()
export class AreasService {
  getArea() {
    return `This action returns all areas`;
  }
}
