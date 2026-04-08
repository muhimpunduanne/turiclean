import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WasteReport } from './entities/waste-report.entity.js';
import { CreateWasteReportDto } from './dto/create-waste-report.dto.js';
import { ReportStatus } from '../common/enums/report-status.enum.js';

@Injectable()
export class WasteReportsService {
  constructor(
    @InjectRepository(WasteReport)
    private readonly reportsRepository: Repository<WasteReport>,
  ) {}

  async create(
    createDto: CreateWasteReportDto,
    reporterId: string,
  ): Promise<WasteReport> {
    const report = this.reportsRepository.create({
      ...createDto,
      reporterId,
    });
    return this.reportsRepository.save(report);
  }

  async findAll(filters?: {
    status?: ReportStatus;
    type?: string;
    assignedToId?: string;
  }): Promise<WasteReport[]> {
    const queryBuilder = this.reportsRepository
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.reporter', 'reporter')
      .leftJoinAndSelect('report.assignedTo', 'assignedTo')
      .orderBy('report.createdAt', 'DESC');

    if (filters?.status) {
      queryBuilder.andWhere('report.status = :status', {
        status: filters.status,
      });
    }
    if (filters?.type) {
      queryBuilder.andWhere('report.type = :type', { type: filters.type });
    }
    if (filters?.assignedToId) {
      queryBuilder.andWhere('report.assignedToId = :assignedToId', {
        assignedToId: filters.assignedToId,
      });
    }

    return queryBuilder.getMany();
  }

  async findByReporter(reporterId: string): Promise<WasteReport[]> {
    return this.reportsRepository.find({
      where: { reporterId },
      relations: ['reporter', 'assignedTo'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<WasteReport> {
    const report = await this.reportsRepository.findOne({
      where: { id },
      relations: ['reporter', 'assignedTo'],
    });
    if (!report) {
      throw new NotFoundException(`Report with ID "${id}" not found`);
    }
    return report;
  }

  async updateStatus(id: string, status: ReportStatus): Promise<WasteReport> {
    const report = await this.findOne(id);
    report.status = status;

    if (status === ReportStatus.RESOLVED) {
      report.resolvedAt = new Date();
    }

    return this.reportsRepository.save(report);
  }

  async assign(id: string, assignedToId: string): Promise<WasteReport> {
    const report = await this.findOne(id);
    report.assignedToId = assignedToId;
    report.status = ReportStatus.IN_PROGRESS;
    return this.reportsRepository.save(report);
  }

  async remove(id: string): Promise<void> {
    const report = await this.findOne(id);
    await this.reportsRepository.remove(report);
  }

  async getDashboard(): Promise<{
    total: number;
    pending: number;
    inProgress: number;
    resolved: number;
    rejected: number;
    byType: Record<string, number>;
    recentReports: WasteReport[];
  }> {
    const [total, pending, inProgress, resolved, rejected] = await Promise.all([
      this.reportsRepository.count(),
      this.reportsRepository.count({ where: { status: ReportStatus.PENDING } }),
      this.reportsRepository.count({
        where: { status: ReportStatus.IN_PROGRESS },
      }),
      this.reportsRepository.count({
        where: { status: ReportStatus.RESOLVED },
      }),
      this.reportsRepository.count({
        where: { status: ReportStatus.REJECTED },
      }),
    ]);

    const byTypeRaw = await this.reportsRepository
      .createQueryBuilder('report')
      .select('report.type', 'type')
      .addSelect('COUNT(*)', 'count')
      .groupBy('report.type')
      .getRawMany();

    const byType: Record<string, number> = {};
    byTypeRaw.forEach((row: { type: string; count: string }) => {
      byType[row.type] = parseInt(row.count, 10);
    });

    const recentReports = await this.reportsRepository.find({
      relations: ['reporter', 'assignedTo'],
      order: { createdAt: 'DESC' },
      take: 10,
    });

    return {
      total,
      pending,
      inProgress,
      resolved,
      rejected,
      byType,
      recentReports,
    };
  }
}
