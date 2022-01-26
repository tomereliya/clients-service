import { Body, Controller, Get, Logger, Param, Post, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './schemas/client.schema';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}


  @Post()
  async createClient(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.createClient(createClientDto);
  }

  @Get(':id')
  async getClient(@Param('id') id: string): Promise<Client> {
    return this.clientsService.getClient(id);
  }

  @Get()
  async getClients(@Query('ids') ids: string, @Query('page') page: number, @Query('limit') limit: number): Promise<Client[]> {
    return this.clientsService.getClients(ids.split(','), page, limit);
  }
}
