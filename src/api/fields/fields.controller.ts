import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { LocationDto } from './dto/location.dto';
import { FieldsService } from './fields.service';
import { Response } from 'express';

@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Get('location')
  findLocation(@Query() query: LocationDto, @Res() res: Response) {
    this.fieldsService
      .findLocation(query)
      .then((result: Array<{ geoInfo: any }>) => {
        const data = result?.[0]?.geoInfo;

        if (data) {
          res.status(HttpStatus.OK).json(data);
        } else {
          res.status(HttpStatus.NOT_FOUND).json({});
        }
      });
  }
}
