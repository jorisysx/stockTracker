'use strict';

import { DateTime } from "luxon"
import dotenv from "dotenv";
dotenv.config();
import request from "request";


const yesterday = DateTime.utc().minus({days: 2}).toISO().split("T")[0]
const apiKey = process.env.API_KEY;

const tickers = ["idcc", "tayd", "calm", "dds"]

for(const ticker of tickers){
  var url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=`+apiKey;
  
  request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      
      console.log(data['Time Series (Daily)'][yesterday]['4. close']);

    }
});



}



