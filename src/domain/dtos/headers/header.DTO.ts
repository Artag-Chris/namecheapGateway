export class HeaderDTO {
  constructor(
    public readonly codigoDepositante: number,
    public readonly fecha: string, // Mantener como string para formato ISO 8601
    public readonly hora: string,
    public readonly usuario: string
  ) {}

  static create(object: { [key: string]: any }): [string?, HeaderDTO?] {
    const { codigoDepositante, fecha, hora, usuario } = object;

    if (!codigoDepositante) return ["El Codigo Depositante es requerido"];
    if (!fecha) return ["La Fecha es requerida"];
    if (!hora) return ["La Hora es requerida"];
    if (!usuario) return ["El Usuario es requerido"];

    // Convertir fecha a cadena en formato ISO 8601 si es un objeto Date
    const fechaISO = fecha instanceof Date ? fecha.toISOString() : fecha;

    return [undefined, new HeaderDTO(codigoDepositante, fechaISO, hora, usuario)];
  }
}