import { Schema, model } from 'mongoose';
import { ITripItinerary } from '../types/document/trip.itinerary.document';
const TripSchema = new Schema(
  {
    destination: { type: String },
    tourpassengers: { type: String },
    startDate:{ type:String},
    
    bussesalloted: {
      type: Schema.Types.ObjectId,
      ref: "BussSchema"
    }

  },
  { timestamps: true }
);
export const ITripItinerarySchema = model<ITripItinerary>('TripItinerarySchema',TripSchema);

