export const parseSubdomains = (xmlData: string, domain: string, sld: string, tld: string): string[] => {
  const subdomains: string[] = [];
  const domainRegex = new RegExp(`<host\\s+Name="(.*?)"\\s+Type="(A|CNAME|MX|TXT)"`, 'g');
  const mainDomainPatterns = [sld + '.' + tld, '@'];
  
  let match: RegExpExecArray | null;
  while ((match = domainRegex.exec(xmlData)) !== null) {
    const hostName = match[1];
    
    // 3. Filtrar dominio principal y wildcards
    if (!mainDomainPatterns.includes(hostName) && !hostName.includes('*')) {
      subdomains.push(
        hostName === '.' ? domain : `${hostName}.${domain}`
      );
    }
  }
  return [...new Set(subdomains)]; // Eliminar duplicados
};