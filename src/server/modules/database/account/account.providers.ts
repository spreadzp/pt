import { AccountSchema } from './shemas/account.shema';
import { Connection } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

export const accountProviders = [
  {
    provide: 'AccountModelToken',
    useFactory: (connection: Connection) => connection.model('Account', AccountSchema),
    inject: [process.env.DB_PROVIDER],
  },
];
