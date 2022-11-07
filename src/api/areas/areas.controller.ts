import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AreasService } from './areas.service';
import { Response } from 'express';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get()
  getArea(@Res() res: Response) {
    this.areasService.getArea().then((result: Array<{ geoInfo: any }>) => {
      const data = result?.[0]?.geoInfo;
      if (data) {
        res.status(HttpStatus.OK).json(data);
      } else {
        res.status(HttpStatus.NOT_FOUND).json({});
      }
    });
  }
}
