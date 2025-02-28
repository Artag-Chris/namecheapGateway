import https from 'https';
import axios from "axios";
import { envs } from "../config/envs";
import { createNamecheapServiceParams, executeCommand, extractDomains, parseSubdomains } from '../config/functions';
import { DomainDetails } from '../domain/interfaces/domainWithSubDomain';
import { getDomainDnsDetails } from '../config/functions/getDomainDetails';

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
      //devolvamos mas datos como el dns, el estado, etc
      console.log('response', response.data);
      return domains;

    } catch (error:any) {
      console.error('Error:', error.message);
    }
  
  }
  async getSubDomains(domain:string){

    const parseDomain = (fullDomain: string) => {
      const parts = fullDomain.split('.');
      return {
        sld: parts[0], // goldraea
        tld: parts.slice(1).join('.') // com (funciona para com.co, co.uk, etc.)
      };
    };
   
    const { sld, tld } = parseDomain(domain);
    const command = 'namecheap.domains.dns.getHosts'    
    const params = {
      ...createNamecheapServiceParams(command),
      SLD: sld,
      TLD: tld
    };
    
    try {
      const response = await axios.get(envs.API_URL, { params });
      //devuelve un arreglo con los dominios
      return parseSubdomains(response.data, domain, sld, tld);

    } catch (error:any) {
      console.error('Error:', error.message);
    }
  
  }
  public async getDomainsWithDetails(): Promise<DomainDetails[]> {
    try {
      // 1. Obtener lista principal de dominios
      const domainsResponse = await executeCommand('namecheap.domains.getList');
      const { domains } = extractDomains(domainsResponse.data);
      
      // 2. Obtener detalles DNS para cada dominio en paralelo
      return await Promise.all(
        domains.map(async (domain: DomainDetails) => ({
          ...domain,
          dnsHosts: await getDomainDnsDetails(domain.name)
        }))
      );
    
     

    } catch (error: any) {
      console.error('Error en getDomainsWithDetails:', error.message);
      throw new Error(`Failed to get domains: ${error.message}`);
    }
}

}
