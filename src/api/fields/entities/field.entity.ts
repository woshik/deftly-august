import { Column, Entity, PrimaryColumn } from 'typeorm';
import { MultiPolygon } from 'geojson';

@Entity()
export class Field {
  @PrimaryColumn()
  gid: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  id: string;

  @Column({
    type: 'geometry',
    srid: 4326,
    spatialFeatureType: 'multipolygon',
  })
  geom: MultiPolygon;
}
