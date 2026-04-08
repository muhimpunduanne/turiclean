import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Truck } from './entities/truck.entity';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckLocationDto } from './dto/update-truck-location.dto';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TrucksService {
  constructor(
    @InjectRepository(Truck)
    private trucksRepository: Repository<Truck>,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async create(createTruckDto: CreateTruckDto, company: User): Promise<Truck> {
    const truck = this.trucksRepository.create({
      ...createTruckDto,
      companyId: company.id,
    });
    return this.trucksRepository.save(truck);
  }

  async findAllByCompany(companyId: string): Promise<Truck[]> {
    return this.trucksRepository.find({ where: { companyId } });
  }

  async findOne(id: string): Promise<Truck> {
    const truck = await this.trucksRepository.findOne({ where: { id } });
    if (!truck) {
      throw new NotFoundException(`Truck with ID ${id} not found`);
    }
    return truck;
  }

  async updateLocation(
    id: string,
    updateLocationDto: UpdateTruckLocationDto,
    company: User,
  ): Promise<Truck> {
    const truck = await this.findOne(id);
    if (truck.companyId !== company.id) {
      throw new ForbiddenException('You do not own this truck');
    }

    truck.latitude = updateLocationDto.latitude;
    truck.longitude = updateLocationDto.longitude;
    const updatedTruck = await this.trucksRepository.save(truck);

    // Broadcast the new location to dashboards / clients
    this.notificationsGateway.broadcast('truck_location_updated', {
      truckId: updatedTruck.id,
      latitude: updatedTruck.latitude,
      longitude: updatedTruck.longitude,
      companyId: updatedTruck.companyId,
    });

    return updatedTruck;
  }
}
