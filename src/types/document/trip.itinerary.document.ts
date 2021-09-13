import { Document } from 'mongoose';
export interface ITripItinerary extends Document {
  _id:string;
  destination: string;
  startDate:string;
  tourpassenger: number;
  tourbookerhone: string;
  TourbookerName: string;
  bussesalloted: Array<string>
  createdAt?: string;
  updatedAt?: string;
 
}