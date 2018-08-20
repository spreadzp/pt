import { ShipmentService } from './shipment.service';
import { ShipmentSchema } from './shemas/shipment.shema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShipmentController } from './shipment.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Shipment', schema: ShipmentSchema }])],
  controllers: [ShipmentController],
  providers: [ShipmentService],
})
export class ShipmentModule { }
