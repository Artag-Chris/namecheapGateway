export class InfoCertificadoFirmaDTO {

constructor(
    public readonly celular:           string,
    public readonly clave:             string,
    public readonly correoElectronico: string,
    public readonly idDocumentoPagare: number,
    public readonly idRolFirmante:     number,
    public readonly numeroDocumento:   string,
    public readonly numeroReferencia:  string,
    public readonly tipoDocumento:     number
){}

static create(object:{[key:string]:any}): [string?,InfoCertificadoFirmaDTO?] {
    const {
        celular,
        clave,
        correoElectronico,
        idDocumentoPagare,
        idRolFirmante,
        numeroDocumento,
        numeroReferencia,
        tipoDocumento
    } = object

    if(!celular)return ['celular es requerido'];
    if(!clave)return ['clave es requerido'];
    if(!correoElectronico)return ['correoElectronico es requerido'];
    if(!idDocumentoPagare)return ['idDocumentoPagare es requerido'];
    if(!idRolFirmante)return ['idRolFirmante es requerido'];
    if(!numeroDocumento)return ['numeroDocumento es requerido'];
    if(!numeroReferencia)return ['numeroReferencia es requerido'];
    if(!tipoDocumento)return ['tipoDocumento es requerido']; 

    return [celular, new InfoCertificadoFirmaDTO(celular,clave,correoElectronico,idDocumentoPagare,idRolFirmante,numeroDocumento,numeroReferencia,tipoDocumento)]
  }
  
}
