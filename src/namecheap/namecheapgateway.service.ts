import XMLAdapter from "../config/adapters/js2xmlparser.adapter";


import https from 'https';
import axios from "axios";
import { parseStringPromise } from 'xml2js';

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export class NameCheapGatewayService {
  constructor() { }

  
  async testService(

  ): Promise<any> {
    const currentDateTime = new Date().toISOString().split('.')[0]; // YYYY-MM-DDTHH:MM:SS format
    const currentTime = new Date().toISOString().split('T')[1].split('.')[0]; // HH:MM:SS format

   

   
  }


}
