import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IBooking } from './booking.model';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body('userId') userId: string, @Body('data') body: IBooking) {
    return this.bookingService.create(userId, body);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Get('me/:userId')
  findAllMine(@Param('userId') userId: string) {
    return this.bookingService.findAllMine(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: IBooking) {
    return this.bookingService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(id);
  }
}
