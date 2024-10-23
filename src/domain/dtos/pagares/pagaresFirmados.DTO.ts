export class PagaresFirmadosDTO {
  constructor(
    public readonly idDocumentoPagare: number,
    public readonly identificacionEmisor: string,
    public readonly mensajeRespuesta: string,
    public readonly numPagareEntidad: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, PagaresFirmadosDTO?] {
    const {
      idDocumentoPagare,
      identificacionEmisor,
      mensajeRespuesta,
      numPagareEntidad,
    } = object;

    if (!idDocumentoPagare) return ["idDocumentoPagare es requerido"];
    if (!identificacionEmisor) return ["identificacionEmisor es requerido"];
    if (!mensajeRespuesta) return ["mensajeRespuesta es requerido"];
    if (!numPagareEntidad) return ["numPagareEntidad es requerido"];

    return [undefined, new PagaresFirmadosDTO(idDocumentoPagare, identificacionEmisor, mensajeRespuesta, numPagareEntidad)];
  }
}
