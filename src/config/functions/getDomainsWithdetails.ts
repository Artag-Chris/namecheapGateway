import { DnsHost } from "../../domain/interfaces/domainWithSubDomain";
import { executeCommand } from "./excuteCommand";
import { extractDnsHosts } from "./extractDnsHost";

export async function getDomainDnsDetails(domain: string): Promise<DnsHost[]> {
    try {
      const [sld, ...tldParts] = domain.split('.');
      const tld = tldParts.join('.');

      const response = await executeCommand('namecheap.domains.dns.getHosts', {
        SLD: sld,
        TLD: tld
      });

      return extractDnsHosts(response.data).hosts
        .filter(host => host.name !== '@' && !host.name.includes('*'))
        .map(host => ({
          hostId: host.hostId,
          name: host.name,
          type: host.type,
          address: host.address,
          ttl: host.ttl,
          isActive: host.isActive,
          isDDNSEnabled: false
        }));

    } catch (error: any) {
      console.error(`Error DNS para ${domain}:`, error.message);
      return [];
    }
}