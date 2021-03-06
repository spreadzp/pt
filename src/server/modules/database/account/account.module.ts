import { AccountSchema } from './shemas/account.shema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule { }
