import { SensorDataSchema } from './shemas/sensor-data.shema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorDataController } from './sensor-data.controller';
import { SensorDataService } from './sensor-data.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'SensorData', schema: SensorDataSchema }])],
  controllers: [SensorDataController],
  providers: [SensorDataService],
})
export class SensorDataModule { }
