import { CrearGiradorDTO, header, HeaderDTO } from "../..";

export class SolicitudCrearGiradorDTO {
  constructor(
    public readonly headerDTO: HeaderDTO,
    public readonly crearGiradorDTO: CrearGiradorDTO
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, SolicitudCrearGiradorDTO?] {
    const { headerDTO, crearGiradorDTO } = object;
    const { codigoDepositante, fecha, hora, usuario } = headerDTO;
    const {
      agenteAutoretenedor_Jur,
      camaraComercioNo_Jur,
      circuloNo_Jur,
      correoElectronico,
      cuentaGirador,
      declarante_Jur,
      direccion1PersonaGrupo_PGP,
      estadoCivil,
    } = crearGiradorDTO;

    if (!headerDTO) return ["El Header es requerido"];
    if (!crearGiradorDTO) return ["El Crear Girador es requerido"];

    if (!codigoDepositante) return ["El Codigo Depositante es requerido"];
    if (!fecha) return ["La Fecha es requerido"];
    if (!hora) return ["La Hora es requerido"];
    if (!usuario) return ["El Usuario es requerido"];
     if (!agenteAutoretenedor_Jur) return ["El agenteAutoretenedor_Jur es requerido"];
    if (!camaraComercioNo_Jur) return ["El camaraComercioNo_Jur es requerido"];
    if (!circuloNo_Jur) return ["El circuloNo_Jur es requerido"];
    if (!correoElectronico) return ["El correoElectronico es requerido"];
    if (!cuentaGirador) return ["El cuentaGirador es requerido"];
    if (!declarante_Jur) return ["El declarante_Jur es requerido"];
    if (!direccion1PersonaGrupo_PGP) return ["El direccion1PersonaGrupo_PGP es requerido"];
    if (!estadoCivil) return ["El estadoCivil es requerido"];

    

    return [
      undefined,
      new SolicitudCrearGiradorDTO(headerDTO, crearGiradorDTO),
    ];
  }
}
