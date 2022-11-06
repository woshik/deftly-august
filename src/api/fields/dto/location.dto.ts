import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export interface Location {
  lon: number;
  lat: number;
}

export class LocationDto implements Location {
  @IsNotEmpty()
  @IsNumber()
  @Min(-180)
  @Max(180)
  lon: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;
}
