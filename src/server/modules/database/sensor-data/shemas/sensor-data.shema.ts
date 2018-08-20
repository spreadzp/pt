import * as mongoose from 'mongoose';

export const SensorDataSchema = new mongoose.Schema({
    shipmentId: String,
    sensorId: String,
    value: Number,
    goal: Boolean,
    timeWork: Boolean,
    time: String,
});
