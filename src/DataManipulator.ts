import { ServerRespond } from './DataStreamer';

export interface Row {
  // stock: string,
  // top_ask_price: number,
  // timestamp: Date,
  //数据类型
  price_abc: number,
  price_def: number,  //for calculate the ratio
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    // caculate the price
    const price_ABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price)
    const price_DEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price)
    const ratio = price_ABC/price_DEF;
    const upper_Bound = 1+0.05;
    const lower_Bound = 1-0.05;
    
    // return serverResponds.map((el: any) => {
      return {
        price_abc: price_ABC,
        price_def: price_DEF,
        ratio,
        // compare
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ?
         serverResponds[0].timestamp: serverResponds[1].timestamp,
        upper_bound: upper_Bound,
        lower_bound: lower_Bound,
        trigger_alert : (ratio > upper_Bound || ratio< lower_Bound) ? ratio : undefined,
        // stock: el.stock,
        // top_ask_price: el.top_ask && el.top_ask.price || 0,
        // timestamp: el.timestamp,
      };
  }
}
