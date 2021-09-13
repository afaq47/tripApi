import express from 'express';
import { BussController } from '../controller/buss.controller';
import { IBUSS } from '../types/document/buss.document';
import { ISaveUpdateResBuss } from '../types/responses/buss.responses';
import { IDeleteReqBuss, IGetReqBuss, ISaveReqBuss,IUpdateReqBuss } from '../types/request/buss.request';
import CustomeError from '../utills/error';

export class BussRoutes {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {

     // This will get buss by id
    this.router.post('/getBussById',async (req, res, next) => {
      try {
        const getreq:IGetReqBuss = req.body;
          const admin:ISaveUpdateResBuss = await new BussController(). getBuss(getreq);
          res.send(admin);
      } catch (error) {
        next(error);
      }
    });

     // This will add menu item
    this.router.post('/AddBuss', async (req, res, next) => {
      try {
        const admin: ISaveReqBuss = req.body;
        const newAdmin:ISaveUpdateResBuss = await new BussController().saveBuss(admin);
        res.status(200).json({
          message: newAdmin
        });
      } catch (error) {
        next(error);
      }
    });

     // This will update busses
    this.router.put('/updateBussDetail', async (req, res, next) => {
      try {
        const admin: IUpdateReqBuss = req.body;
        const upadated_admin:ISaveUpdateResBuss = await new BussController().updateBuss(admin);
        const response = {
          upadated_admin,
        };
        res.status(200).json({
          message: response
        });
      } catch (error) {
        next(error);
      }
    });

     // This will delete buss
    this.router.delete('/deleteBuss', async (req, res, next) => {
      try {
        const delreq:IDeleteReqBuss = req.body;
        const Deleted_admin = await new BussController().deletBuss(delreq);
        res.status(200).json({
          message: 'Buss Details deleted'
        });
      } catch (error) {
        next(error);
      }
    });

    // This will return all of the busses
    this.router.get('/getBussList', async (req, res, next) => {
      try {
        const adminList: ISaveUpdateResBuss[] = await new BussController().getBussList();
        res.status(200).json({
          result: adminList
        });

      } catch (error) {
        next(error);
      }
    });


  }
}
export const BussRoutesApi = new BussRoutes().router;