import { DnsHost, ApiMetadata } from "../../domain/interfaces/domainWithSubDomain";

export function extractDnsHosts(xmlResponse: string): { hosts: DnsHost[]; metadata: ApiMetadata } {
    const result = {
        hosts: [] as DnsHost[],
        metadata: {
            server: '',
            executionTime: 0,
            status: 'ERROR'
        } as ApiMetadata
    };

    // Extraer estado de la API
    const apiStatusMatch = xmlResponse.match(/<ApiResponse Status="([^"]+)"/);
    result.metadata.status = apiStatusMatch?.[1] || 'ERROR';

    // Extraer información de hosts
    const hostRegex = /<host\s+([^>]+)/g;
    let hostMatch;

    while ((hostMatch = hostRegex.exec(xmlResponse))) { // Corregido el paréntesis adicional
        const hostAttrs = hostMatch[1];
        const host: DnsHost = {
            hostId: 0,
            name: '',
            type: '',
            address: '',
            ttl: 0,
            isActive: true,
            isDDNSEnabled: false
        };

        const attrRegex = /(\w+)="([^"]+)"/g;
        let attrMatch;

        while ((attrMatch = attrRegex.exec(hostAttrs))) { // Corregido el paréntesis adicional
            const key = attrMatch[1].toLowerCase();
            const value = attrMatch[2];

            switch (key) {
                case 'hostid':
                    host.hostId = parseInt(value, 10);
                    break;
                case 'name':
                    host.name = value;
                    break;
                case 'type':
                    host.type = value;
                    break;
                case 'address':
                    host.address = value;
                    break;
                case 'mxpref':
                    host.mxPref = parseInt(value, 10);
                    break;
                case 'ttl':
                    host.ttl = parseInt(value, 10);
                    break;
                case 'isactive':
                    host.isActive = value.toLowerCase() === 'true';
                    break;
                case 'isddnsenabled':
                    host.isDDNSEnabled = value.toLowerCase() === 'true';
                    break;
                case 'associatedapptitle':
                    // Skip associatedapptitle as it's not part of DnsHost interface
                    break;
            }
        }

        result.hosts.push(host);
    }

    // Extraer metadatos adicionales
    const serverMatch = xmlResponse.match(/<Server>([^<]+)<\/Server>/);
    if (serverMatch) result.metadata.server = serverMatch[1];

    const execTimeMatch = xmlResponse.match(/<ExecutionTime>([^<]+)<\/ExecutionTime>/);
    if (execTimeMatch) result.metadata.executionTime = parseFloat(execTimeMatch[1]);

    return result;
}