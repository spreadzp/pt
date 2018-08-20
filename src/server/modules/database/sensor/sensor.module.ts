import { SensorSchema } from './shemas/sensor.shema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Sensor', schema: SensorSchema }])],
  controllers: [SensorController],
  providers: [SensorService],
})
export class SensorModule { }
