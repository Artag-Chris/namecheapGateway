import { ConsultaGiradorServiceDTO } from "../..";
import { ArchivoAdjuntoDTO } from "../archivos/archivoAdjunto.DTO";

export class CrearPagareDTO {
  constructor(
    apoderadoCuenta: number,
    apoderadoNumId: string,
    apoderadoTipoId: number,
    cuenta: string,
    departamento: string,
    empresaOtorgante: string,
    fechaGrabacionPagare: Date,
    idDocumentoPagare: number,
    nitEmisor: string,
    numPagareEntidad: string,
    numReferencia: string,
    otorganteNumId: string,
    otorganteTipoId: number,
    pais: string,
    regional: string,
    textoAdicional: string,
    tipoPagare: number
  ) {}

  static create(object: { [key: string]: any }): [string?, CrearPagareDTO?] {
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
    } = object;

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
    if (!regional) return ["La Regional es requerido"];
    if (!textoAdicional) return ["El Texto Adicional es requerido"];
    if (!tipoPagare) return ["El Tipo Pagare es requerido"];

    return [
      undefined,
      new CrearPagareDTO(
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
        tipoPagare
      ),
    ];
  }
}
