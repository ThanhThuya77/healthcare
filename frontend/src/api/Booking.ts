import axios from 'axios';
import { API } from '../constants/common';

export interface IBooking {
  id?: string;
  event: string;
  location: string;
  proposedDate: string[];
  confirmProposedDate?: string;
  rejectedReason?: string;
  status?: IStatus;
}

export enum BookingStatus {
  approved = 'Approved',
  rejected = 'Rejected',
  pendingReview = 'Pending Review',
}

export type IStatus = `${BookingStatus}` | undefined;

export const getAllBookingAPI = async () => {
  const result: IBooking[] = await axios.get(API.BOOKING);
  return result;
};

export const findBookingAPI = async (id: string) => {
  const result: IBooking = await axios.get(`${API.BOOKING}/${id}`);
  return result;
};

export const getAllMyBookingAPI = async (userId: string) => {
  const result: IBooking[] = await axios.get(`${API.MY_BOOKING}/${userId}`);
  return result;
};

export const createBookingAPI = async (userId: string, data: IBooking) => {
  const result: IBooking = await axios.post(`${API.BOOKING}`, { userId, data });
  return result;
};

export const updateBookingAPI = async (id: string, data: IBooking) => {
  const result: IBooking = await axios.patch(`${API.BOOKING}/${id}`, data);
  return result;
};

export const removeBookingAPI = async (id: string) => {
  const result: IBooking = await axios.delete(`${API.BOOKING}/${id}`);
  return result;
};
