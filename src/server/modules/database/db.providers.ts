import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
console.log('process.env.DB_URL :', process.env.DB_URL);
export const databaseProviders = [
    {
        provide: process.env.DB_PROVIDER,
        useFactory: async () => {
            (mongoose as any).Promise = global.Promise;
            return await mongoose.connect(process.env.DB_URL);
        },
    },
];