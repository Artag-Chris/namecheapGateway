import { HeaderDTO, PagaresFirmadosDTO } from "../..";

export class SolicitudPagaresFirmadosDTO {

    constructor(
        public readonly headerDTO: HeaderDTO,
        public readonly pagaresFirmadosDTO: PagaresFirmadosDTO
    ){}

    static create(object: {
        [key: string]: any;
      }): [string?, SolicitudPagaresFirmadosDTO?] {
        const { header, pagaresFirmadosDTO } = object;
        
        if (!header) return ["headerDTO es requerido"];
        if (!pagaresFirmadosDTO) return ["pagaresFirmadosDTO es requerido"];

        const { codigoDepositante, fecha, hora, usuario } = header;
        if (!codigoDepositante) return ["El Codigo Depositante es requerido"];
        if (!fecha) return ["La Fecha es requerido"];
        if (!hora) return ["La Hora es requerido"];
        if (!usuario) return ["El Usuario es requerido"];

        const {
            idDocumentoPagare,
            identificacionEmisor,
            mensajeRespuesta,
            numPagareEntidad,
          } = pagaresFirmadosDTO;

          if (!idDocumentoPagare) return ["idDocumentoPagare es requerido"];
          if (!identificacionEmisor) return ["identificacionEmisor es requerido"];
          if (!mensajeRespuesta) return ["mensajeRespuesta es requerido"];
          if (!numPagareEntidad) return ["numPagareEntidad es requerido"];
  
        return [undefined, new SolicitudPagaresFirmadosDTO(header, pagaresFirmadosDTO)];
      }
}