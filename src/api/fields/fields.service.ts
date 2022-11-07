import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './dto/location.dto';
import { Field } from './entities/field.entity';

@Injectable()
export class FieldsService {
  @InjectRepository(Field)
  private readonly repository: Repository<Field>;

  findLocation({ lon, lat }: Location) {
    return this.repository
      .createQueryBuilder()
      .select(
        `json_build_object(
          'type', 'Feature', 
          'geometry', ST_AsGeoJSON(geom)::json
        )`,
        'geoInfo',
      )
      .where(
        `ST_Intersects(geom, ST_GeomFromText('POINT(${lon} ${lat})', 4326))`,
      )
      .execute();
  }
}
