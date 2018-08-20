export class CreateSensorDto {
  readonly sensorId: string;
  readonly deviceId: string;
  readonly sensorName: string;
  readonly publicKey: string;
  readonly status: string;
  readonly ovnerId: string;
}
