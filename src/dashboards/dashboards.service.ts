import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { WasteReport } from '../waste-reports/entities/waste-report.entity';
import { Truck } from '../trucks/entities/truck.entity';
import { Role } from '../common/enums/role.enum.js';
import { ReportStatus } from '../common/enums/report-status.enum.js';

@Injectable()
export class DashboardsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(WasteReport)
    private wasteReportRepository: Repository<WasteReport>,
    @InjectRepository(Truck)
    private truckRepository: Repository<Truck>,
  ) {}

  async getAdminDashboardStats() {
    const totalUsers = await this.userRepository.count();
    const totalCompanies = await this.userRepository.count({
      where: { role: Role.COMPANY },
    });
    const totalHouseholds = await this.userRepository.count({
      where: { role: Role.HOUSEHOLD },
    });

    const totalReports = await this.wasteReportRepository.count();
    const pendingReports = await this.wasteReportRepository.count({
      where: { status: ReportStatus.PENDING },
    });
    const resolvedReports = await this.wasteReportRepository.count({
      where: { status: ReportStatus.RESOLVED },
    });

    const totalTrucks = await this.truckRepository.count();

    return {
      users: {
        total: totalUsers,
        companies: totalCompanies,
        households: totalHouseholds,
      },
      reports: {
        total: totalReports,
        pending: pendingReports,
        resolved: resolvedReports,
      },
      trucks: { total: totalTrucks },
    };
  }

  async getCompanyDashboardStats(companyId: string) {
    const pendingReports = await this.wasteReportRepository.count({
      where: { assignedToId: companyId, status: ReportStatus.PENDING },
    });
    const resolvedReports = await this.wasteReportRepository.count({
      where: { assignedToId: companyId, status: ReportStatus.RESOLVED },
    });

    const totalTrucks = await this.truckRepository.count({
      where: { companyId },
    });

    return {
      reports: { pending: pendingReports, resolved: resolvedReports },
      trucks: { total: totalTrucks },
    };
  }
}
