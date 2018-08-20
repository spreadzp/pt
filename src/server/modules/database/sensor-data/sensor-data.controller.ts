import { SensorData } from './../../../models/sensor-data';
import { Controller, Get, Post, Body, Param, HttpStatus, Res } from '@nestjs/common';
import { CreateSensorDataDto } from './dto/create-sensor-data.dto';
import { SensorDataService } from './sensor-data.service';

@Controller('data')
export class SensorDataController {
  constructor(private readonly sensorDataService: SensorDataService) { }

  @Post('create')
  async create(@Body() createSensorDataDto: CreateSensorDataDto) {
    this.sensorDataService.create(createSensorDataDto);
  }

  @Post('new-data')
  async newData(@Param() param: any, @Body() data: any) {
    console.log('data :', data);
    this.sensorDataService.addNewData(data);
  }

  @Get('all')
  async findAll(): Promise<SensorData[]> {
    const sensorDatas = await this.sensorDataService.findAll();
    return sensorDatas;
  }
  @Get('**')
  notFoundPage(@Res() res: any) {
    res.redirect('/');
  }
}