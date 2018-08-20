//import { AccountMijinService } from './../../blockchain/account.mijin.service';
import { Account } from './../../../models/account';
import { CreateAccountDto } from './dto/create-account.dto';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountMijinService } from '../../../blockchain/services/account.mijin.service';

@Injectable()
export class AccountService {
  accountMijinService: AccountMijinService;
  constructor(
    @InjectModel('Account') private readonly accountModel: Model<Account>
  ) {
   this.accountMijinService = new AccountMijinService();
  }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const createdAccount = new this.accountModel(createAccountDto);
    return await createdAccount.save();
  }

  async findAll(): Promise<Account[]> {
    return await this.accountModel.find().exec();
  }

  async createMultisig(nameMultisigPrivate: string, consigners: string[]){
    return await this.accountMijinService.createMultisig(nameMultisigPrivate, consigners);
  }

  async info(pubKey: string){
    return await this.accountMijinService.accountInfo(pubKey);
  }
}
