import { Delivery } from './../../../models/delivery';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DeliveryService {
  constructor(@InjectModel('Delivery') private readonly deliveryModel: Model<Delivery>) {}

  async create(createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
    const createdDelivery = new this.deliveryModel(createDeliveryDto);
    return await createdDelivery.save();
  }

  async findAll(): Promise<Delivery[]> {
    return await this.deliveryModel.find().exec();
  }
}
