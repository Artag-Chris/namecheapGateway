import https from 'https';
import axios from "axios";
import { envs } from "../config/envs";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export class NameCheapGatewayService {
  constructor() { }

  
  async testService(){
    const command = 'namecheap.domains.getList'    
    function extractDomains(xmlResponse:any) {
      const domains = [];
      // Dividir el XML por cada etiqueta <Domain
      const domainParts = xmlResponse.split('<Domain ');
      
      for (const part of domainParts) {
        // Buscar el atributo Name="..."
        const nameMatch = part.match(/Name="([^"]+)"/);
        if (nameMatch) {
          domains.push(nameMatch[1]); // Agregar el nombre del dominio
        }
      }
      return domains;
    }

    const params = {
      ApiKey:envs.API_KEY,
      UserName: envs.API_USER,
      APIUser: envs.API_USER,
      Command: 'namecheap.domains.getList', // Método para listar dominios
      ClientIp: envs.CLIENT_IP,
      // Page: 1, // Página de resultados
      // PageSize: 10, // Número de dominios por página
    };
    
    try {
      const response = await axios.get(envs.API_URL, { params });

      const domains = extractDomains(response.data);
      return domains;
      console.log('Respuesta XML:', response.data);

    } catch (error:any) {
      console.error('Error:', error.message);
    }
  
  }


}
