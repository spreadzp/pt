import { Params } from '@angular/router';
import { Account } from './../../../models/account';
import { Controller, Get, Post, Body, Param, HttpStatus, Res } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountService } from './account.service';
import { AccountMijinService } from '../../../blockchain/services/account.mijin.service';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService
  ) { }

  @Post('create')
  async create(@Body() createAccountDto: CreateAccountDto) {
    this.accountService.create(createAccountDto);
    console.log('createAccountDto   :');
  }

  @Get('all')
  async findAll(): Promise<Account[]> {
    const accounts = await this.accountService.findAll();
    return accounts;
  }

  @Get('info-account/:id')
  async accountInfo(@Param() params: any, @Res() res: any) {
    const info = await this.accountService.info(params.id);
    await  console.log('info :', info);
    //res.status(HttpStatus.OK).json(info);
  }

  @Post('create-multisig')
  async createMultisig(@Body() body: any) {
    this.accountService.createMultisig(body.nameMultisigPrivate, body.consigners);
  }
  @Get('**')
  notFoundPage(@Res() res: any) {
    res.redirect('/');
  }
}