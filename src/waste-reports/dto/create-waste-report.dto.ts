import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ReportType } from '../../common/enums/report-type.enum.js';

export class CreateWasteReportDto {
  @ApiProperty({
    enum: ReportType,
    example: ReportType.FULL_BIN,
    description: 'Type of waste report',
  })
  @IsEnum(ReportType)
  @IsNotEmpty()
  type: ReportType;

  @ApiProperty({
    example: 'The bin at the corner of KN 5 Ave is overflowing',
    description: 'Detailed description of the issue',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: -1.9441, required: false })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiProperty({ example: 30.0619, required: false })
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiProperty({ example: 'KN 5 Ave, Kigali, Rwanda' })
  @IsString()
  @IsNotEmpty()
  address: string;
}
