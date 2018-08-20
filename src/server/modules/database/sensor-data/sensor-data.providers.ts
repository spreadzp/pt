import { SensorDataSchema } from './shemas/sensor-data.shema';
import { Connection } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

export const sensorDatasProviders = [
  {
    provide: 'SensorDataModelToken',
    useFactory: (connection: Connection) => connection.model('SensorData', SensorDataSchema),
    inject: [process.env.DB_PROVIDER],
  },
];