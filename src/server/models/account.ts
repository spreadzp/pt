import { Document } from 'mongoose';

export interface Account extends Document {
  readonly shipmentsId: string;
  readonly name: string;
  readonly publicKey: string;
}