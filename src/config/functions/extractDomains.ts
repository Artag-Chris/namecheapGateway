export function extractDomains(xmlResponse:any) {
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