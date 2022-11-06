import { Injectable } from '@nestjs/common';

@Injectable()
export class FieldsService {
  findLocation() {
    return `This action returns all fields`;
  }
}
