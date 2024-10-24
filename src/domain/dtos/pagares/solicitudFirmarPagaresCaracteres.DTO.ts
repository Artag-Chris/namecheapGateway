import { HeaderDTO, InformacionFirmaPagareCaracteresDTO } from "../..";

export class SolicitudFirmarPagaresCaracteresDTO{

    constructor(
        public readonly headerDTO: HeaderDTO,
        public readonly informacionFirmaPagareCaracteresDTO: InformacionFirmaPagareCaracteresDTO[]
    ){}

    static create(object: {[key: string]: any}): [string?, SolicitudFirmarPagaresCaracteresDTO?] {
        //"solicitudFirmarPagaresCaracteresDTO" es donde se enviaran los datos con el xml
        const {
          headerDTO,
          informacionFirmaPagareCaracteresDTO
        } = object;
        if (!headerDTO) return ["headerDTO es requerido"];
        if (!informacionFirmaPagareCaracteresDTO) return ["informacionFirmaPagareCaracteresDTO es requerido"];

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
          } = informacionFirmaPagareCaracteresDTO;

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
          headerDTO,
          new SolicitudFirmarPagaresCaracteresDTO(
            headerDTO,
            informacionFirmaPagareCaracteresDTO
          )
        ];
    }

}