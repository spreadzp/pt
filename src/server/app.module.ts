// nest
import { Module } from '@nestjs/common';

// modules
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { AngularUniversalModule } from './modules/angular-universal/angular-universal.module';
import { GraphqlModule } from './modules/graphql/graphql.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorModule } from './modules/database/sensor/sensor.module';
import { AccountModule } from './modules/database/account/account.module';
import { DeliveryModule } from './modules/database/delivery/delivery.module';
import { SensorDataModule } from './modules/database/sensor-data/sensor-data.module';
import { ShipmentModule } from './modules/database/shipment/shipment.module';
import { AccountMijinService } from './blockchain/services/account.mijin.service';
import { TxMijinService } from './blockchain/services/tx.mijin.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    SensorModule, AccountModule, DeliveryModule,
    ShipmentModule, SensorDataModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    // GraphqlModule,
    AngularUniversalModule.forRoot()
  ],
  controllers: [],
  providers: [AccountMijinService, TxMijinService]
})
export class ApplicationModule { }
