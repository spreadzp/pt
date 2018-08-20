import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
    shipmentsId: String,
    name: String,
    publicKey: String,
});
