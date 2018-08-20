import { Component } from '@nestjs/common';
import { config } from './config';
import {
    Address, Deadline, XEM, NetworkType,
    PlainMessage, TransferTransaction, TransactionHttp,
    Account, RegisterNamespaceTransaction, Message, Mosaic,
    UInt64, MosaicId, PublicAccount, AggregateTransaction, LockFundsTransaction,
    Listener,
    CosignatureSignedTransaction,
    CosignatureTransaction,
    AccountHttp
} from 'nem2-sdk';
import * as dotenv from 'dotenv';
dotenv.config();

export class TransactionHelper {
    transactionHttp: TransactionHttp;
    privateKey = process.env.PRIV_KEY as string;
    account: Account;
    registerNamespaceTransaction: RegisterNamespaceTransaction;

    constructor() {
        this.transactionHttp = new TransactionHttp(process.env.URL);
        //this.account = Account.createFromPrivateKey(this.privateKey, NetworkType.MIJIN_TEST);
    }

    createTransferTransaction() {
        const recipientAddress = process.env.RECIPIENT_ADDRESS;

        const transferTransaction = TransferTransaction.create(
            Deadline.create(),
            Address.createFromRawAddress(recipientAddress),
            [XEM.createRelative(10)],
            PlainMessage.create('Welcome To NEM'),
            NetworkType.MIJIN_TEST,
        );
    }

    sendMosaic(account: Account) {
        const recipientAddress = process.env.RECIPIENT_ADDRESS;
        const signer = PublicAccount.createFromPublicKey(process.env.PUB_KEY, NetworkType.MIJIN_TEST);
        const transferTransaction = TransferTransaction.create(
            Deadline.create(),
            Address.createFromRawAddress(recipientAddress),
            [new Mosaic(new MosaicId("tokenbusiness1:nem-token11"), UInt64.fromUint(5555))],
            PlainMessage.create("send 55555 nem-token11"),
            NetworkType.MIJIN_TEST,
        );

        this.sendSignedTransaction(transferTransaction, account);
    }

    sendSignedTransaction(transaction: any, account: Account) {
        const signedTransaction = account.sign(transaction);

        this.transactionHttp.announce(signedTransaction).subscribe(
            x => console.log(x),
            err => console.error(err)
        );
    }

    createShipment(
        buyerPrivateKeyName: string, sellerPublicKeyName: string,
        countSellerGoods: number, nameGoods: string, countBuyerCurrency: number) {
        console.log('!!!!!!', countSellerGoods, nameGoods, countBuyerCurrency);
        // Replace with private key
        const alicePrivateKey = process.env[buyerPrivateKeyName];
        // Replace with public key
        const ticketDistributorPublicKey = process.env[sellerPublicKeyName];
        const aliceAccount = Account.createFromPrivateKey(alicePrivateKey, NetworkType.MIJIN_TEST);
        const ticketDistributorPublicAccount = PublicAccount.createFromPublicKey(ticketDistributorPublicKey, NetworkType.MIJIN_TEST);

        const aliceToTicketDistributorTx = TransferTransaction.create(
            Deadline.create(),
            ticketDistributorPublicAccount.address,
            [XEM.createRelative(countBuyerCurrency)],
            PlainMessage.create(`send ${countBuyerCurrency} nem:xem to distributor`),
            NetworkType.MIJIN_TEST,
        );
        const message = `send ${countSellerGoods}${nameGoods} to alice`;
        const ticketDistributorToAliceTx = TransferTransaction.create(
            Deadline.create(),
            aliceAccount.address,
            [new Mosaic(new MosaicId(nameGoods), UInt64.fromUint(countSellerGoods))],
            PlainMessage.create(message),
            NetworkType.MIJIN_TEST,
        );

        const aggregateTransaction = AggregateTransaction.createBonded(Deadline.create(),
            [
                aliceToTicketDistributorTx.toAggregate(aliceAccount.publicAccount),
                ticketDistributorToAliceTx.toAggregate(ticketDistributorPublicAccount),
            ],
            NetworkType.MIJIN_TEST);

        const signedTransaction = aliceAccount.sign(aggregateTransaction);
        const lockFundsTransaction = LockFundsTransaction.create(
            Deadline.create(),
            XEM.createRelative(10),
            UInt64.fromUint(480),
            signedTransaction,
            NetworkType.MIJIN_TEST);

        const lockFundsTransactionSigned = aliceAccount.sign(lockFundsTransaction);
        const transactionHttp = new TransactionHttp(process.env.URL_MIJIN);

        // announce signed transaction
        const listener = new Listener(process.env.URL_MIJIN);
        transactionHttp.announce(lockFundsTransactionSigned).subscribe(
            x => console.log(x),
            err => console.error(err));

        listener.open().then(() => {

            transactionHttp.announce(lockFundsTransactionSigned).subscribe(x => console.log('announce', x),
                err => console.error(err));

            listener.confirmed(aliceAccount.address)
                .filter((transaction) => transaction.transactionInfo !== undefined
                    && transaction.transactionInfo.hash === lockFundsTransactionSigned.hash)
                .flatMap(ignored => transactionHttp.announceAggregateBonded(signedTransaction))
                .subscribe(announcedAggregateBonded => {
                    console.log('announcedAggregateBonded', announcedAggregateBonded);
                    //this.confirmDistributor();
                },
                    err => console.error(err));
        });
    }

    cosignAggregateBondedTransaction(transaction: AggregateTransaction, ticketDistributorAccount: Account) {
        // const ticketDistributorAccount = Account.createFromPrivateKey(config.TOCKEN_DISTRIBUTOR_PRIVATE_KEY, NetworkType.MIJIN_TEST);
        const cosignatureTransaction = CosignatureTransaction.create(transaction);
        return ticketDistributorAccount.signCosignatureTransaction(cosignatureTransaction);
    }

    confirmDistributor(privateKeyName: string) {
        const ticketDistributorAccount = Account.createFromPrivateKey(process.env[privateKeyName], NetworkType.MIJIN_TEST);
        const accountHttp = new AccountHttp(process.env.URL_MIJIN);
        const transactionHttp = new TransactionHttp(process.env.URL_MIJIN);
        console.log('accountHttp :', accountHttp);

        accountHttp.aggregateBondedTransactions(ticketDistributorAccount.publicAccount)
            .flatMap((_) => _)
            .filter((_) => !_.signedByAccount(ticketDistributorAccount.publicAccount))
            .map(transaction => {
                console.log('transaction :', transaction);
                return this.cosignAggregateBondedTransaction(transaction, ticketDistributorAccount);
            })
            .flatMap(cosignatureSignedTransaction => {
                console.log('cosignatureSignedTransaction :', cosignatureSignedTransaction);
                return transactionHttp.announceAggregateBondedCosignature(cosignatureSignedTransaction);
            }
            )
            .subscribe(announcedTransaction => console.log(announcedTransaction),
                err => console.error(err));
    }

    confirmMultisig(multisigPrivateKeyName: string, cosignerPrivateKeyName: string) {
        const consignerAccount = Account.createFromPrivateKey(process.env[cosignerPrivateKeyName], NetworkType.MIJIN_TEST);
        const multisigAccount = Account.createFromPrivateKey(process.env[multisigPrivateKeyName], NetworkType.MIJIN_TEST);
        const transactionHttp = new TransactionHttp(process.env.URL_MIJIN);
        const accountHttp = new AccountHttp(process.env.URL_MIJIN);

        accountHttp.aggregateBondedTransactions(multisigAccount.publicAccount)
            .flatMap((_) => _)
            .filter((_) => !_.signedByAccount(consignerAccount.publicAccount))
            .map(transaction => this.cosignAggregateBondedTransaction(transaction, consignerAccount))
            .flatMap(cosignatureSignedTransaction => transactionHttp.announceAggregateBondedCosignature(cosignatureSignedTransaction))
            .subscribe(announcedTransaction => console.log(announcedTransaction),
                err => console.error(err));
    }

    anounce(signedTransaction: any) {
        const transactionHttp = new TransactionHttp(process.env.URL);

        // announce signed transaction

        transactionHttp.announce(signedTransaction).subscribe(
            x => console.log(x),
            err => console.error(err));
    }
}
