import { Schema, model } from 'mongoose';
import { IBUSS } from '../types/document/buss.document';
const BusSchema = new Schema(
  {
    BussName: { type: String },
    BussSeats: { type: String },
    BussBokingDates:[Date],
  
  },
  { timestamps: true }
);
export const BussSchema = model<IBUSS>('BussSchema',BusSchema);