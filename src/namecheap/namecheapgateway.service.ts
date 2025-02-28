import https from 'https';
import axios from "axios";
import { envs } from "../config/envs";
import { createNamecheapServiceParams, extractDomains } from '../config/functions';

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export class NameCheapGatewayService {
  constructor() { }

  
  async getDomains(){
    const command = 'namecheap.domains.getList'    
    const params = createNamecheapServiceParams(command);
    
    try {
      const response = await axios.get(envs.API_URL, { params });
      const domains = extractDomains(response.data);
      //devuelve un arreglo con los dominios
      return domains;

    } catch (error:any) {
      console.error('Error:', error.message);
    }
  
  }


}
