import { BussSchema } from '../model/buss.model';
import { IBUSS } from '../types/document/buss.document';
export class BussRepositories {
  constructor() {}
  getsBuss(_id: string) {
    return BussSchema.findById(_id);
  }
  saveBuss(ADMin: IBUSS) {
    return new BussSchema(ADMin).save();
  }
  updateBuss(Admmin: IBUSS) {
    return BussSchema.findByIdAndUpdate(Admmin._id, Admmin, {
      new: true
    });
  }
  deletBuss(_id: string) {
    return BussSchema.findByIdAndDelete(_id);
  }
  getBussList() {
   return BussSchema.find();
  }
   /**
     * 
     * @param date Requested tour date Pattern yyyy-mm-dd
     * @returns array of available busses
     */
    async GetAvailableBussesByDate(date: Date) {
      function FilterAvailable(elem: any, index: number, array: any) {
          return elem.BussBookingDates.indexOf(date) == -1
      }
      var available_busses = []
      var all_busses = await BussSchema.find({
          $gt: new Date(date),
          $lt: new Date(date)
      });
      available_busses = all_busses;
      //available_busses = all_busses.filter(FilterAvailable);
      return available_busses;
  }

}