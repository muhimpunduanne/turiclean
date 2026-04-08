import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Dashboards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('dashboards')
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}

  @Get('admin')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get global analytics for Admin Dashboard' })
  getAdminDashboardStats() {
    return this.dashboardsService.getAdminDashboardStats();
  }

  @Get('company')
  @Roles(Role.COMPANY)
  @ApiOperation({
    summary: 'Get analytics for the current Waste Company Dashboard',
  })
  getCompanyDashboardStats(@Request() req) {
    return this.dashboardsService.getCompanyDashboardStats(req.user.id);
  }
}
