import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { BookingStatus, IBooking } from './booking.model';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel('Booking') private readonly bookingModel: Model<IBooking>,
  ) {}

  async create(userId: string, body: IBooking) {
    const newBooking = new this.bookingModel(body);
    newBooking.createdByUserId = userId;
    newBooking.status = BookingStatus.pendingReview;
    const result = await newBooking.save();
    return {
      id: result.id,
      event: result.event,
      location: result.location,
      proposedDate: result.proposedDate,
      confirmProposedDate: result.confirmProposedDate,
      rejectedReason: result.rejectedReason,
      status: result.status,
    };
  }

  async findAll() {
    const allBooking = await this.bookingModel.find().exec();
    return allBooking.map((booking) => ({
      id: booking.id,
      event: booking.event,
      location: booking.location,
      proposedDate: booking.proposedDate,
      confirmProposedDate: booking.confirmProposedDate,
      rejectedReason: booking.rejectedReason,
      status: booking.status,
      createdByUserId: booking.createdByUserId,
    })) as IBooking[];
  }

  async findAllMine(userId: string) {
    const allBooking = await this.bookingModel
      .find({ createdByUserId: `${userId}` })
      .exec();

    return allBooking.map((booking) => ({
      id: booking.id,
      event: booking.event,
      location: booking.location,
      proposedDate: booking.proposedDate,
      confirmProposedDate: booking.confirmProposedDate,
      rejectedReason: booking.rejectedReason,
      status: booking.status,
    })) as IBooking[];
  }

  async findOne(bookingId: string) {
    const booking = await this.findBooking(bookingId);
    return {
      id: booking.id,
      event: booking.event,
      location: booking.location,
      proposedDate: booking.proposedDate,
      confirmProposedDate: booking.confirmProposedDate,
      rejectedReason: booking.rejectedReason,
      status: booking.status,
    };
  }

  async update(bookingId: string, body: IBooking) {
    const updatedBooking = await this.findBooking(bookingId);

    if (body.status) {
      updatedBooking.status = body.status;
    }

    if (body.confirmProposedDate) {
      updatedBooking.confirmProposedDate = body.confirmProposedDate;
    }

    if (body.rejectedReason) {
      updatedBooking.rejectedReason = body.rejectedReason;
    }

    const result = await updatedBooking.save();
    return result;
  }

  async remove(bookingId: string) {
    const result = await this.bookingModel.findByIdAndRemove(bookingId);
    return result;
  }

  private async findBooking(bookingId: string): Promise<IBooking> {
    let booking;
    try {
      booking = await this.bookingModel.findById(bookingId);
    } catch (error) {
      throw new NotFoundException('Could not find this booking.');
    }

    if (!booking) {
      throw new NotFoundException('Could not find this booking.');
    }

    return booking;
  }
}
