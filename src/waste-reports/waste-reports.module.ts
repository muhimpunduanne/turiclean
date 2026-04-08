import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WasteReportsService } from './waste-reports.service.js';
import { WasteReportsController } from './waste-reports.controller.js';
import { WasteReport } from './entities/waste-report.entity.js';
import { NotificationsModule } from '../notifications/notifications.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([WasteReport]), NotificationsModule],
  controllers: [WasteReportsController],
  providers: [WasteReportsService],
  exports: [WasteReportsService],
})
export class WasteReportsModule {}
