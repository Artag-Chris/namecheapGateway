export class ConsultaPagareServiceDTO {
    constructor(
        public readonly codigoDeceval:                number,
        public readonly idEstadoPagare:               number,
        public readonly idTipoIdentificacionFirmante: number,
        public readonly numIdentificacionFirmante:    string,
        public readonly numPagareEntidad:             string,
    ){}
  
  static create(object:{[key:string]:any}):[string?,ConsultaPagareServiceDTO?] {

    if(!object) return ["El Objeto es requerido"];
    const {codigoDeceval,idEstadoPagare,idTipoIdentificacionFirmante,numIdentificacionFirmante,numPagareEntidad} = object

    if(!codigoDeceval) return ["El Codigo Deceval es requerido"];
    if(!idEstadoPagare) return ["El Id Estado Pagare es requerido"];
    if(!idTipoIdentificacionFirmante) return ["El Id Tipo Identificacion Firmante es requerido"];
    if(!numIdentificacionFirmante) return ["El Num Identificacion Firmante es requerido"];
    if(!numPagareEntidad) return ["El Num Pagare Entidad es requerido"];

    return [undefined,new ConsultaPagareServiceDTO(codigoDeceval,idEstadoPagare,idTipoIdentificacionFirmante,numIdentificacionFirmante,numPagareEntidad)]
  }

}
