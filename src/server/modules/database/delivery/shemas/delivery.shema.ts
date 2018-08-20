import * as mongoose from 'mongoose';

export const DeliverySchema = new mongoose.Schema({
    shipmentId: String,
    sensorId: String,
    timeSensor: String,
    valueSensor: String,
});
