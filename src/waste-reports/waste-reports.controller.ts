import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { WasteReportsService } from './waste-reports.service.js';
import { CreateWasteReportDto } from './dto/create-waste-report.dto.js';
import {
  UpdateWasteReportStatusDto,
  AssignWasteReportDto,
} from './dto/update-waste-report.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import { ReportStatus } from '../common/enums/report-status.enum.js';

@ApiTags('Waste Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('waste-reports')
export class WasteReportsController {
  constructor(private readonly reportsService: WasteReportsService) {}

  @Post()
  @Roles(Role.HOUSEHOLD)
  @ApiOperation({ summary: 'Create a waste report (Household only)' })
  @ApiResponse({ status: 201, description: 'Report created' })
  async create(@Body() createDto: CreateWasteReportDto, @Request() req: any) {
    return this.reportsService.create(createDto, req.user.id);
  }

  @Get()
  @Roles(Role.COMPANY, Role.ADMIN)
  @ApiOperation({ summary: 'List all reports with optional filters (Company/Admin)' })
  @ApiQuery({ name: 'status', enum: ReportStatus, required: false })
  @ApiQuery({ name: 'type', required: false })
  @ApiResponse({ status: 200, description: 'List of reports' })
  async findAll(
    @Query('status') status?: ReportStatus,
    @Query('type') type?: string,
    @Query('assignedToId') assignedToId?: string,
  ) {
    return this.reportsService.findAll({ status, type, assignedToId });
  }

  @Get('my-reports')
  @Roles(Role.HOUSEHOLD)
  @ApiOperation({ summary: 'Get current user reports (Household only)' })
  @ApiResponse({ status: 200, description: 'User reports' })
  async getMyReports(@Request() req: any) {
    return this.reportsService.findByReporter(req.user.id);
  }

  @Get('dashboard')
  @Roles(Role.COMPANY, Role.ADMIN)
  @ApiOperation({ summary: 'Get dashboard statistics (Company/Admin)' })
  @ApiResponse({ status: 200, description: 'Dashboard data' })
  async getDashboard() {
    return this.reportsService.getDashboard();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get report by ID' })
  @ApiResponse({ status: 200, description: 'Report details' })
  @ApiResponse({ status: 404, description: 'Report not found' })
  async findOne(@Param('id') id: string) {
    return this.reportsService.findOne(id);
  }

  @Patch(':id/status')
  @Roles(Role.COMPANY, Role.ADMIN)
  @ApiOperation({ summary: 'Update report status (Company/Admin)' })
  @ApiResponse({ status: 200, description: 'Status updated' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateWasteReportStatusDto,
  ) {
    return this.reportsService.updateStatus(id, updateDto.status!);
  }

  @Patch(':id/assign')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Assign report to a company (Admin only)' })
  @ApiResponse({ status: 200, description: 'Report assigned' })
  async assign(
    @Param('id') id: string,
    @Body() assignDto: AssignWasteReportDto,
  ) {
    return this.reportsService.assign(id, assignDto.assignedToId);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a report (Admin only)' })
  @ApiResponse({ status: 200, description: 'Report deleted' })
  async remove(@Param('id') id: string) {
    await this.reportsService.remove(id);
    return { message: 'Report deleted successfully' };
  }
}
