import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTruckLocationDto {
  @ApiProperty({ example: -1.9441 })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ example: 30.0619 })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
