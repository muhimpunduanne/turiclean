import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ReportStatus } from '../../common/enums/report-status.enum.js';

export class UpdateWasteReportStatusDto {
  @ApiProperty({
    enum: ReportStatus,
    example: ReportStatus.IN_PROGRESS,
    description: 'New status for the report',
  })
  @IsEnum(ReportStatus)
  @IsOptional()
  status?: ReportStatus;
}

export class AssignWasteReportDto {
  @ApiProperty({
    example: 'uuid-of-company-user',
    description: 'ID of the company user to assign this report to',
  })
  @IsString()
  assignedToId: string;
}
