import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TrucksService } from './trucks.service';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckLocationDto } from './dto/update-truck-location.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Trucks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('trucks')
export class TrucksController {
  constructor(private readonly trucksService: TrucksService) {}

  @Post()
  @Roles(Role.COMPANY)
  @ApiOperation({ summary: 'Register a new waste collection truck' })
  create(@Body() createTruckDto: CreateTruckDto, @Request() req) {
    return this.trucksService.create(createTruckDto, req.user);
  }

  @Get()
  @Roles(Role.COMPANY)
  @ApiOperation({ summary: 'Get all trucks belonging to the current company' })
  findAllByCompany(@Request() req) {
    return this.trucksService.findAllByCompany(req.user.id);
  }

  @Patch(':id/location')
  @Roles(Role.COMPANY)
  @ApiOperation({ summary: 'Update truck location coordinates' })
  updateLocation(
    @Param('id') id: string,
    @Body() updateTruckLocationDto: UpdateTruckLocationDto,
    @Request() req,
  ) {
    return this.trucksService.updateLocation(
      id,
      updateTruckLocationDto,
      req.user,
    );
  }
}
