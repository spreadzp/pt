import { Sensor } from './../../../models/sensor';
import { Controller, Get, Post, Body, Param, HttpStatus, Res } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { SensorService } from './sensor.service';

@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) { }

  @Post('create')
  async create(@Body() createSensorDto: CreateSensorDto) {
    this.sensorService.create(createSensorDto);
  }

  @Get('all')
  async findAll(): Promise<Sensor[]> {
    const sensors = await this.sensorService.findAll();
    return sensors;
  }

  @Post('switch-off')
  async switchOff(@Body() orderSwitchOff: any) {
    this.sensorService.switchOff(orderSwitchOff);
  }

  @Get('**')
  notFoundPage(@Res() res: any) {
    res.redirect('/');
  }
}