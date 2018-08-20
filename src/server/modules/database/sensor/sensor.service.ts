import { CreateSensorDto } from './dto/create-sensor.dto';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sensor } from './../../../models/sensor';

@Injectable()
export class SensorService {
  constructor(@InjectModel('Sensor') private readonly sensorModel: Model<Sensor>) {}

  async create(createSensorDto: CreateSensorDto): Promise<Sensor> {
    const createdSensor = new this.sensorModel(createSensorDto);
    return await createdSensor.save();
  }
  async switchOff(orderSwitchOff: any): Promise<Sensor> {
    const createdSensor = new this.sensorModel(orderSwitchOff);
    return await createdSensor.save();
  }
  async findAll(): Promise<Sensor[]> {
    return await this.sensorModel.find().exec();
  }
}
