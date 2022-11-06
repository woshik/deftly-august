import { Column, Entity, PrimaryColumn } from 'typeorm';
import { MultiPolygon } from 'geojson';

@Entity()
export class Area {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 80,
  })
  location: string;

  @Column({
    type: 'geometry',
    srid: 4326,
    spatialFeatureType: 'multipolygon',
  })
  geom: MultiPolygon;
}
