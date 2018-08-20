export class CreateShipmentDto {
  readonly shipmentId: string;
  readonly startShipmentTime: string;
  readonly buyerCurrency: string;
  readonly payment: number;
  readonly goodsName: string;
  readonly quantityOfGoods: number;
  readonly endShipmentTime: string;
  readonly buyerPrivateKeyName: string;
  readonly sellerPublicKeyName: string;
  readonly statusShipment: string;
}
