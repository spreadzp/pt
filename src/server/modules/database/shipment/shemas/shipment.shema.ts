import * as mongoose from 'mongoose';

export const ShipmentSchema = new mongoose.Schema({
    shipmentId: String,
    startShipmentTime: String,
    buyerCurrency: String,
    payment: Number,
    goodsName: String,
    quantityOfGoods: Number,
    endShipmentTime: String,
    buyerPrivateKeyName: String,
    sellerPublicKeyName: String,
    statusShipment: String,
});
