export interface  ITripItinerarySaveReq{
  destination: string;
  startDate:"yyyy-mm-dd";
  tourpassenger: number
  }
  export interface ITripItineraryUpdateReq {
  _id:string;
  destination: string;
  startDate:string;
  endDate:string;
  totalpassengers: string;
  bussId: string;
  }


  
 