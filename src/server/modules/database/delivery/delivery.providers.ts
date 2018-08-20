import { DeliverySchema } from './shemas/delivery.shema';
import { Connection } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

export const deliveryProviders = [
  {
    provide: 'DeliveryModelToken',
    useFactory: (connection: Connection) => connection.model('Delivery', DeliverySchema),
    inject: [process.env.DB_PROVIDER],
  },
];
