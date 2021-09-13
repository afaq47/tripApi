import { IBUSS } from '../types/document/buss.document';
import { BussRepositories } from '../repositories/buss.repositories';
import CustomeError from '../utills/error';
import { Get, Route, Tags, Post, Body, Path, Put, Delete,Security, SuccessResponse } from "tsoa";
import { ISaveUpdateResBuss } from '../types/responses/buss.responses';
import { IDeleteReqBuss, IGetReqBuss, ISaveReqBuss,IUpdateReqBuss } from '../types/request/buss.request';

@Route('Buss')
@Tags('Buss')

export class BussController {
  constructor() { }
  /**
   * @summary This will get busses to the system by id
   */
 
  @Post("/getBussById")
  async getBuss(@Body() getreq:IGetReqBuss): Promise<ISaveUpdateResBuss> {
    const admin: any = await new BussRepositories().getsBuss(getreq.id);
    if (admin === null) throw new CustomeError(404, 'Buss not found');
    return <ISaveUpdateResBuss>admin;
  }

  /**
   * @summary This will add new buses to the system
   */

  @Post('/AddBuss')
  async saveBuss(@Body() admin: ISaveReqBuss): Promise<ISaveUpdateResBuss> {
    const new_admin:IBUSS = await new BussRepositories().saveBuss(<IBUSS>(admin));
    return <ISaveUpdateResBuss>(new_admin);
  }

  /**
   * @summary This will update buses to the system
   */

  @Put('/updateBussDetail')
  async updateBuss(@Body() admin: IUpdateReqBuss): Promise<ISaveUpdateResBuss> {
    const update_admin:any = await new BussRepositories().updateBuss(<IBUSS>(admin));
    if (update_admin === null)
      throw new CustomeError(400, 'Buss Details not updated');
    return <ISaveUpdateResBuss>update_admin;
  }

  /**
   * @summary This will delete buses to the system
   */

  @Delete('/deleteBuss')
  @SuccessResponse("200","Buss deleted")
  async deletBuss(@Body() delreq: IDeleteReqBuss) {
    return await new BussRepositories().deletBuss(delreq.id);
  }

  /**
   * @summary This will get buses to the system
   */

  @Get('/getBussList')
  async getBussList(): Promise<ISaveUpdateResBuss[]> {
    const aadmin: IBUSS[] = await new BussRepositories().getBussList();
    return <ISaveUpdateResBuss[]>(aadmin);
  }


}
