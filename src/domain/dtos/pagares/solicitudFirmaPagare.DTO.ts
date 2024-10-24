import { HeaderDTO } from "../..";
import { InformacionFirmaPagareDTO } from "./informacionFirmaPagare.DTO";

export class SolicitudFirmaPagareDTO {
    constructor(
        public readonly headerDTO: HeaderDTO,
        public readonly informacionFirmaPagareDTO: InformacionFirmaPagareDTO
    ) {}

static create(object: {[key: string]: any}): [string?, SolicitudFirmaPagareDTO?] {
    const {headerDTO, informacionFirmaPagareDTO} = object;

    if (!headerDTO || !informacionFirmaPagareDTO) {
        return ["No se puede crear la solicitud de firma de pagare, faltan datos"];
    }
    
    const { codigoDepositante, fecha, hora, usuario } = headerDTO;
    if (!codigoDepositante) return ["El Codigo Depositante es requerido"];
    if (!fecha) return ["La Fecha es requerido"];
    if (!hora) return ["La Hora es requerido"];
    if (!usuario) return ["El Usuario es requerido"];
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
      } = informacionFirmaPagareDTO;

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
        new SolicitudFirmaPagareDTO(headerDTO, informacionFirmaPagareDTO),
      ];
}
}