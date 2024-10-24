import { HeaderDTO } from "../..";
import { CrearPagareDTO } from "./crearPagare.DTO";

export class SolicitudCrearPagareDTO {
  constructor(
    public readonly headerDTO: HeaderDTO,
    public readonly crearPagareDTO: CrearPagareDTO[]
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, SolicitudCrearPagareDTO?] {
    const { header, crearPagareDTO } = object;
    
    if (!header) return ["El Header es requerido"];
    if (!crearPagareDTO) return ["El Crear Pagare es requerido"];
    const { codigoDepositante, fecha, hora, usuario } = header;

    if (!codigoDepositante) return ["El Codigo Depositante es requerido"];
    if (!fecha) return ["La Fecha es requerido"];
    if (!hora) return ["La Hora es requerido"];
    if (!usuario) return ["El Usuario es requerido"];

    const {
      apoderadoCuenta,
      apoderadoNumId,
      apoderadoTipoId,
      cuenta,
      departamento,
      empresaOtorgante,
      fechaGrabacionPagare,
      idDocumentoPagare,
      nitEmisor,
      numPagareEntidad,
      numReferencia,
      otorganteNumId,
      otorganteTipoId,
      pais,
      regional,
      textoAdicional,
      tipoPagare,
    } = crearPagareDTO;

    if (!apoderadoCuenta) return ["El Apoderado Cuenta es requerido"];
    if (!apoderadoNumId) return ["El Apoderado Num Id es requerido"];
    if (!apoderadoTipoId) return ["El Apoderado Tipo Id es requerido"];
    if (!cuenta) return ["La Cuenta es requerido"];
    if (!departamento) return ["El Departamento es requerido"];
    if (!empresaOtorgante) return ["El Empresa Otorgante es requerido"];
    if (!fechaGrabacionPagare)
      return ["La Fecha Grabacion Pagare es requerido"];
    if (!idDocumentoPagare) return ["El Id Documento Pagare es requerido"];
    if (!nitEmisor) return ["El Nit Emisor es requerido"];
    if (!numPagareEntidad) return ["El Num Pagare Entidad es requerido"];
    if (!numReferencia) return ["El Num Referencia es requerido"];
    if (!otorganteNumId) return ["El Otorgante Num Id es requerido"];
    if (!otorganteTipoId) return ["El Otorgante Tipo Id es requerido"];
    if (!pais) return ["El Pais es requerido"];
    if (!regional) return ["El Regional es requerido"];
    if (!textoAdicional) return ["El Texto Adicional es requerido"];
    if (!tipoPagare) return ["El Tipo Pagare es requerido"];

    return [undefined, new SolicitudCrearPagareDTO(header, [crearPagareDTO])];
  }
}
