import { ArchivoAdjuntoDTO } from "../archivos/archivoAdjunto.DTO";

export class InformacionFirmaPagareDTO {
  constructor(
    public readonly otpPagare?: string,
    public readonly otpProcedimiento?: string,
    public readonly archivosAdjuntos?: ArchivoAdjuntoDTO[],
    public readonly clave?: string,
    public readonly idDocumentoPagare?: number,
    public readonly idRolFirmante?: number,
    public readonly motivo?: string,
    public readonly numeroDocumento?: string,
    public readonly tipoDocumento?: number
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, InformacionFirmaPagareDTO?] {
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

    if (!otpPagare || !otpProcedimiento || !archivosAdjuntos || !clave || !idDocumentoPagare || !idRolFirmante || !motivo || !numeroDocumento || !tipoDocumento) {
      return ["No se puede crear el informacion de firma del pagare, faltan datos"];
    }

    return [
      otpPagare,
      new InformacionFirmaPagareDTO(
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
