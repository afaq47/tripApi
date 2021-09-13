import CustomError from '../utills/error';
import { Controller, SuccessResponse } from '@tsoa/runtime';
import { Post, Body, Route, Tags } from "tsoa";
import { ITripItinerarySaveReq } from '../types/request/trip.itinerary.request';
import { ITripItineraryRes } from '../types/responses/trip.itinerary.responses';
import { ITripItineraryRepository } from '../repositories/trip.itinerary.repositories';
import { BussRepositories } from '../repositories/buss.repositories';

@Route('/tour')
@Tags('Tour')
export class ITripItineraryController extends Controller {
    constructor() {
        super()
    }

    /**
    * Register your tour request here.
    * returns registered tour
    * @summary "Open API to Register for a tour" 
    */
    @Post('/registerTour')
    @SuccessResponse(200, 'Tour registered successfully')
    async RegisterTrip(@Body() tour:  ITripItinerarySaveReq): Promise<any> {
        var date: any;
        date = new Date(tour.startDate);

        if (date.toString() != 'Invalid Date') {
            var available_busses = await new BussRepositories().GetAvailableBussesByDate(date);
            var alloted_busses = this.AllotBusses(available_busses, tour.tourpassenger);
            console.log(alloted_busses);

            const registered_tour: ITripItineraryRes = <ITripItineraryRes>await new ITripItineraryRepository().RegisterTour(tour);
            if (!registered_tour)
                throw new CustomError(400, 'Cannot register tour');
            return < ITripItineraryRes>registered_tour;
        }
        else
            throw new CustomError(400, 'Cannot register tour. Invalid TourDate entered', )
    }

    private AllotBusses(available_busses: Array<any>, tour_participants: number) {
        if (available_busses.length == 0)
            throw new CustomError(404, 'No available busses for your requested tour');

        let buss_subset = this.GenerateBussesSubsets(available_busses, available_busses.length);
        let mapped_subsets = this.MapTotalSubsetCapacity(buss_subset).sort(function (a: any, b: any) {
            return b.total_capacity - a.total_capacity;
        });

        while (mapped_subsets.length > 0) {
            let curr_subset = mapped_subsets.pop();
            if (curr_subset) {
                if (curr_subset.total_capacity >= tour_participants)
                    return curr_subset;
            }
        }
        throw new CustomError(400, 'We currently donot have enough busses to accomodate your tour');
    }

    GenerateBussesSubsets(available_busses: Array<any>, total_busses: number) {
        var all_subsets = [];

        for (var i = 0; i < (Math.pow(2, total_busses)); i++) {
            var subset = [];

            for (var j = 0; j < total_busses; j++) {
                if (i & (1 << j)) {
                    subset.push(available_busses[j]);
                }
            }

            if (subset.length > 0)
                all_subsets.push(subset);
        }

        return all_subsets;
    }

    MapTotalSubsetCapacity(subsets: any) {
        var mapped_subsets = [];
        for (var i = 0; i < subsets.length; i++) {
            let total_capacity = 0;
            for (var j = 0; j < subsets[i].length; j++) {
                total_capacity += subsets[i][j].BussSeats;
            }
            mapped_subsets.push({
                Busses: subsets[i],
                total_capacity: total_capacity
            });
        }
        return mapped_subsets;
    }
}
