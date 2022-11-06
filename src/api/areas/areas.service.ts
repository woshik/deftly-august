import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './entities/area.entity';

@Injectable()
export class AreasService {
  @InjectRepository(Area)
  private readonly repository: Repository<Area>;

  getArea() {
    const result = this.repository
      .createQueryBuilder()
      .select(
        `json_build_object('type', 'FeatureCollection', 'features', json_agg(ST_AsGeoJSON(geom)::json))`,
      )
      .execute();

    return result;
  }
}
