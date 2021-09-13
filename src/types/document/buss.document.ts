import { Document } from 'mongoose';
export interface IBUSS extends Document {
  _id:string;
  bussName: string;
  bussSeats: string;
  bussBokingDates: string[];
  createdAt?: string;
  updatedAt?: string;
}