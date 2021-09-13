export interface ISaveReqBuss{
  bussName: string;
  bussSeats: string;
  bussBokingDates: string[];
  
  }
  export interface IUpdateReqBuss {
    _id:string;
    bussName: string;
    bussSeats: string;
    bussBokingDates: string[];
  }
  export interface IGetReqBuss {
    id: string
  }
  export interface IDeleteReqBuss {
    id: string
  }