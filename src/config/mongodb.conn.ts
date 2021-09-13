import { connect, connection } from 'mongoose';
export class DbMongo {
  connect(h: string, dbName: string, u?: string, pass?: string, p?: number) {
    let connectionuri = `mongodb+srv://afaq:afaq1996@cluster0.v3apc.mongodb.net/abc?retryWrites=true&w=majority`;
    
    if (u != undefined && pass != undefined) {
      connectionuri = `mongodb+srv://afaq:afaq1996@cluster0.v3apc.mongodb.net/abc?retryWrites=true&w=majority`;
    }
    connect(connectionuri, (err: any) => {
      if (err) {
        console.log(err);
        console.log('DataBase Connection Falied');
      } else {
        console.log('connected with database');
      }
    });
  }
}
export const MonStatConnection = connection.readyState;