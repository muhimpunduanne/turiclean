import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardsService } from './dashboards.service';
import { DashboardsController } from './dashboards.controller';
import { User } from '../users/entities/user.entity';
import { WasteReport } from '../waste-reports/entities/waste-report.entity';
import { Truck } from '../trucks/entities/truck.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, WasteReport, Truck])],
  providers: [DashboardsService],
  controllers: [DashboardsController],
})
export class DashboardsModule {}
