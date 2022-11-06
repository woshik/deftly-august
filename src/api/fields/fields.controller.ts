import { Controller, Get, Query } from '@nestjs/common';
import { LocationDto } from './dto/location.dto';
import { FieldsService } from './fields.service';

@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Get('location')
  findLocation(@Query() query: LocationDto) {
    return this.fieldsService.findLocation(query);
  }
}
