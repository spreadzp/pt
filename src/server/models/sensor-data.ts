import { Document } from 'mongoose';

export interface SensorData extends Document {
    readonly shipmentId: string;
    readonly sensorId: string;
    readonly value: number;
    readonly goal: boolean;
    readonly timeWork: boolean;
    readonly time: string;
  }
