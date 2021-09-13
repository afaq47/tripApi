import express from 'express';
import { ITripItineraryController } from '../controller/trip.itinerary.controller';

export class TourRoutes {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {

        // Register new tour ..route
        this.router.post('/registerTour', async (req, res, next) => {
            try {
                var tour = await new  ITripItineraryController().RegisterTrip(req.body);
                res.status(200).json(
                    {
                        Registeration_Details: tour
                    }
                ).end()
            } catch (error) {
                next(error);
            }
        });
    }
}
export const TourRoutesApi = new TourRoutes().router;