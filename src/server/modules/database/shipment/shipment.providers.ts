import { ShipmentSchema } from './shemas/shipment.shema';
import { Connection } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();


export const shipmentsProviders = [
  {
    provide: 'ShipmentModelToken',
    useFactory: (connection: Connection) => connection.model('Shipment', ShipmentSchema),
    inject: [process.env.DB_PROVIDER],
  },
];
