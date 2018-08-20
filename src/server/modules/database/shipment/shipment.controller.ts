import { Shipment } from './../../../models/shipment';
import { Controller, Get, Post, Body, Param, HttpStatus, Res } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { ShipmentService } from './shipment.service';

@Controller('shipment')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) { }

  @Post('create')
  async create(@Body() createShipmentDto: CreateShipmentDto) {
    this.shipmentService.create(createShipmentDto);
    console.log('createShipmentDto :' );
  }

  @Post('confirm')
  async confirm(@Body() body: any) {
    await this.shipmentService.confirm(body);
  }

  @Get('all')
  async findAll(): Promise<Shipment[]> {
    const shipments = await this.shipmentService.findAll();
    return shipments;
  }
  @Get('**')
  notFoundPage(@Res() res: any) {
    res.redirect('/');
  }
}