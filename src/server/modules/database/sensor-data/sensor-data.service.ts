import { CreateSensorDataDto } from './dto/create-sensor-data.dto';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SensorData } from './../../../models/sensor-data';

@Injectable()
export class SensorDataService {
  constructor(@InjectModel('SensorData') private readonly sensorDataModel: Model<SensorData>) {}

  async create(createSensorDataDto: CreateSensorDataDto): Promise<SensorData> {
    const createdSensorData = new this.sensorDataModel(createSensorDataDto);
    return await createdSensorData.save();
  }

  async findAll(): Promise<SensorData[]> {
    return await this.sensorDataModel.find().exec();
  }

  async addNewData(newDataSensor: SensorData) {
    const createdSensorData = new this.sensorDataModel(newDataSensor);
    return await createdSensorData.save();
  }
}
