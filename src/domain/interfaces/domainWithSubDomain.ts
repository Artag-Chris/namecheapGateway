export interface DomainDetails {
  id: string;
    name: string;
    user: string;
    created: Date;
    expires: Date;
    isExpired: boolean;
    isLocked: boolean;
    autoRenew: boolean;
    whoisGuard: string;
    isPremium: boolean;
    isUsingOurDNS: boolean;
    modifiedDate: Date;
    dnsHosts: DnsHost[];
    subdomains: SubdomainDetails[];
  }
  
  export interface DnsHost {
    hostId: number;
    name: string;
    type: string;
    address: string;
    mxPref?: number;
    ttl: number;
    isActive: boolean;
    isDDNSEnabled: boolean;
  }
  
  export interface Pagination {
    totalItems: number;
    currentPage: number;
    pageSize: number;
  }
  
  export interface ApiMetadata {
    server: string;
    executionTime: number;
    status: string;
  }

  export interface SubdomainDetails {
    fullName: string;    // app.goldraea.com
    recordType: string;  // A, CNAME, MX, etc
    target: string;      // IP o dominio destino
    ttl: number;
    isActive: boolean;
  }

  