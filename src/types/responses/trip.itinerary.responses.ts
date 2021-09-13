// Register Tour response
export interface ITripItineraryRes {
  destinations: Array<string>;
  startDate: Date;
  tourpassenger: number;
  bussesalloted: Array<ITripItinerarySingleBUSS>
}

/**
* Single Bus interface 
* Used when populating Tour Alloted busses
*/
interface ITripItinerarySingleBUSS {
  _id: string;
  BussName: string;
  BussSeats: number;
}