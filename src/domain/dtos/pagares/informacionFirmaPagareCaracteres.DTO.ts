import { ArchivoAdjuntoDTO } from "../archivos/archivoAdjunto.DTO";

export class InformacionFirmaPagareCaracteresDTO {
  constructor(
    public readonly otpPagare: string,
    public readonly otpProcedimiento: string,
    public readonly archivosAdjuntos: ArchivoAdjuntoDTO[],
    public readonly clave: string,
    public readonly idDocumentoPagare: number,
    public readonly idRolFirmante: number,
    public readonly motivo: string,
    public readonly numeroDocumento: string,
    public readonly tipoDocumento: number
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, InformacionFirmaPagareCaracteresDTO?] {
    const {
      otpPagare,
      otpProcedimiento,
      archivosAdjuntos,
      clave,
      idDocumentoPagare,
      idRolFirmante,
      motivo,
      numeroDocumento,
      tipoDocumento,
    } = object;

    if (!otpPagare) return ["otpPagare es requerido"];
    if (!otpProcedimiento) return ["otpProcedimiento es requerido"];
    if (!archivosAdjuntos) return ["archivosAdjuntos es requerido"];
    if (!clave) return ["clave es requerido"];
    if (!idDocumentoPagare) return ["idDocumentoPagare es requerido"];
    if (!idRolFirmante) return ["idRolFirmante es requerido"];
    if (!motivo) return ["motivo es requerido"];
    if (!numeroDocumento) return ["numeroDocumento es requerido"];
    if (!tipoDocumento) return ["tipoDocumento es requerido"];
    
    return [
      otpPagare,
      new InformacionFirmaPagareCaracteresDTO(
        otpPagare,
        otpProcedimiento,
        archivosAdjuntos,
        clave,
        idDocumentoPagare,
        idRolFirmante,
        motivo,
        numeroDocumento,
        tipoDocumento
      ),
    ];
  }
}
