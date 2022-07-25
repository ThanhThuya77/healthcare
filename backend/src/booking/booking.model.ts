import * as mongoose from 'mongoose';

export enum BookingStatus {
  approved = 'Approved',
  rejected = 'Rejected',
  pendingReview = 'Pending Review',
}

export const BookingSchema = new mongoose.Schema({
  event: { type: String, required: true },
  location: { type: String, required: true },
  proposedDate: { type: Array<string>, required: true },
  confirmProposedDate: String,
  rejectedReason: String,
  status: String,
  createdByUserId: String,
});

export interface IBooking extends mongoose.Document {
  id?: string;
  event: string;
  location: string;
  proposedDate: string[];
  confirmProposedDate?: string;
  rejectedReason?: string;
  status?: string;
  createdByUserId?: string;
}
