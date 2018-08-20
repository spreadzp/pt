import { Document } from 'mongoose';

export interface Delivery extends Document {
  readonly shipmentId: string;
  readonly sensorId: string;
  readonly timeSensor: string;
  readonly valueSensor: string;
}
