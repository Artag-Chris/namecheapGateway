import { DnsHost } from "../../domain/interfaces/domainWithSubDomain";
import { executeCommand } from "./excuteCommand";
import { extractDnsHosts } from "./extractDnsHost";

export const getDomainDnsDetails = async (domain: string): Promise<DnsHost[]> => {
    try {
      
      const [sld, ...tldParts] = domain.split('.');
      const tld = tldParts.join('.');

      const response = await executeCommand('namecheap.domains.dns.getHosts', {
        SLD: sld,
        TLD: tld
      });
      
      return extractDnsHosts(response.data).hosts;
    } catch (error: unknown) {
      console.error(`Error obteniendo DNS para ${domain}:`, error instanceof Error ? error.message : 'Unknown error');
      return Promise.resolve([]);
    }
  }