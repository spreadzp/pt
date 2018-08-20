import { Shipment } from './../../../models/shipment';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TxMijinService } from '../../../blockchain/services/tx.mijin.service';

@Injectable()
export class ShipmentService {
  txMijinService: TxMijinService;
  constructor(@InjectModel('Shipment') private readonly shipmentModel: Model<Shipment>) {
    this.txMijinService = new TxMijinService();
  }

  async create(shipment: CreateShipmentDto) {
    this.txMijinService.createShipment(
      shipment.buyerPrivateKeyName, shipment.sellerPublicKeyName, shipment.quantityOfGoods,
      shipment.goodsName, shipment.payment);
    const createdShipment = new this.shipmentModel(shipment);
    return await createdShipment.save();
  }

  async confirm(body: any) {
    await this.txMijinService.confirm(body.multisigPrivateKeyName, body.cosignerPrivateKeyName);
  }

  async findAll(): Promise<Shipment[]> {
    return await this.shipmentModel.find().exec();
  }
}
