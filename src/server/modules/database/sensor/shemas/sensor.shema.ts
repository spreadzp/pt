import * as mongoose from 'mongoose';

export const SensorSchema = new mongoose.Schema({
    sensorId: String,
    deviceId: String,
    sensorName: String,
    publicKey: String,
    status: String,
    ovnerId: String,
});
