import express from 'express';
import { BussRoutesApi } from './buss.routes';
import { TourRoutesApi } from './trip.Routes';
export class MainRouter {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {
             
       // busses routes
        this.router.use('/Buss',BussRoutesApi);
           //using TourRoutesApi from BussRoutes
           this.router.use('/tour', TourRoutesApi);

    }


}
export const MainApi = new MainRouter().router;