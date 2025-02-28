import { DomainDetails } from "../../domain/interfaces/domainWithSubDomain";

export function extractDomains(xmlResponse: string): { domains: DomainDetails[] } {
  const domains: DomainDetails[] = [];
  const domainRegex = /<Domain\s+([^>]+)/g;

  let match;
  while ((match = domainRegex.exec(xmlResponse))) {
    const attrs = match[1];
    const domain: Partial<DomainDetails> = {};

    const attrRegex = /(\w+)="([^"]+)"/g;
    let attrMatch;
    
    while ((attrMatch = attrRegex.exec(attrs))) {
      const key = attrMatch[1].toLowerCase();
      const value = attrMatch[2];

      switch (key) {
        case 'id':
          domain.id = value;
          break;
        case 'name':
          domain.name = value;
          break;
        case 'created':
          domain.created = new Date(value);
          break;
        case 'expires':
          domain.expires = new Date(value);
          break;
        case 'isexpired':
          domain.isExpired = value.toLowerCase() === 'true';
          break;
      }
    }

    if (domain.name) {
      domains.push({
        id: domain.id || '',
        name: domain.name,
        created: domain.created || new Date(),
        expires: domain.expires || new Date(),
        isExpired: domain.isExpired || false,
        dnsHosts: [],
        user: '',
        isLocked: false,
        autoRenew: false,
        whoisGuard: 'false',
        isPremium: false,
        isUsingOurDNS: false,
        modifiedDate: new Date(),
        subdomains: []
      });
    }
  }

  return { domains };
}