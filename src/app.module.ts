import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://tomer:IAlaQ7S3wqAsT5d9@cluster0.pbl3x.mongodb.net/clients?retryWrites=true&w=majority'),ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
