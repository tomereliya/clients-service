import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { Client, ClientDocument } from './schemas/client.schema';

@Injectable()
export class ClientsService {
    constructor(@InjectModel(Client.name) private readonly clientModel: Model<ClientDocument>){}

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
      try{
        const createdClient = new this.clientModel(createClientDto);
        return await createdClient.save();
      }catch(err){
          Logger.error(`Error on creating client with id: ${createClientDto.id}`);
          throw new InternalServerErrorException((err as Error).message);
      }
  }

  async getClient(id: string): Promise<Client> {
      let client : Client;
    try{
        client = await this.clientModel.findOne({id});
    }catch(err){
        Logger.error(`Error on finding client with id: ${id}`);
        throw new InternalServerErrorException((err as Error).message);
    }
    if(!client){
        throw new NotFoundException(`Cannot find client ${id}`);
    }
    return client;
}


async getClients(ids: string[], page = 0, limit = 10): Promise<Client[]> {
    try{
        const clients = await this.clientModel.find({id: {$in: ids}}).skip(page * limit).limit(limit);
        return clients;
    }catch(err){
        Logger.error(`Error on finding client with ids: ${ids.join(',')}`);
        throw new InternalServerErrorException((err as Error).message);
    }
}
}


