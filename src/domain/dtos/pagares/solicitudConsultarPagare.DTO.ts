import { ConsultaPagareServiceDTO, HeaderDTO } from "../..";

export class SolicitudConsultarPagareDTO {

    constructor(
        public readonly headerDTO: HeaderDTO,
        public readonly consultaPagareServiceDTO: ConsultaPagareServiceDTO
    ) {}
    
    static create(object: {[key: string]: any}): [string?, SolicitudConsultarPagareDTO?] {
        const { headerDTO, consultaPagareServiceDTO } = object
  //"solicitudConsultarPagareDTO" es el xml de la peticion
        if(!headerDTO) return ["El Header es requerido"];
        if(!consultaPagareServiceDTO) return ["El ConsultaPagareServiceDTO es requerido"];

        const { codigoDepositante, fecha, hora, usuario } = headerDTO
        if(!codigoDepositante) return ["El Codigo Depositante es requerido"];
        if(!fecha) return ["La Fecha es requerido"];
        if(!hora) return ["La Hora es requerido"];
        if(!usuario) return ["El Usuario es requerido"];

        const {
            codigoDeceval,
            idEstadoPagare,
            idTipoIdentificacionFirmante,
            numIdentificacionFirmante,
            numPagareEntidad
        } = consultaPagareServiceDTO
        
        if(!codigoDeceval)return["El Codigo Deceval requerido"]
        if(!idEstadoPagare)return ["El Id Estado Pagare es requerido"]
        if(!idTipoIdentificacionFirmante)return ["El Id Tipo Identificacion Firmante es requerido"]
        if(!numIdentificacionFirmante)return ["El Num Identificacion Firmante es requerido"]
        if(!numPagareEntidad)return ["El Num Pagare Entidad es requerido"]


        return [undefined, new SolicitudConsultarPagareDTO(headerDTO, consultaPagareServiceDTO)]
    }
}