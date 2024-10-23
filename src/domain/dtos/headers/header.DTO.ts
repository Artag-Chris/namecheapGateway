export class HeaderDTO {
    constructor(
    public readonly codigoDepositante: number,
    public readonly fecha:             string,//TODO:cambiado de Date por pruebas
    public readonly hora:              string,
    public readonly usuario:           string, //que usuario si el del front o server?
    ){}

  static create(object:{[key:string]:any}): [string?,HeaderDTO?]{
    const {codigoDepositante,fecha,hora,usuario} = object;

    if(!codigoDepositante) return ["El Codigo Depositante es requerido"];
    if(!fecha) return ["La Fecha es requerido"];
    if(!hora) return ["La Hora es requerido"];
    if(!usuario) return ["El Usuario es requerido"];
    
    return [undefined,new HeaderDTO(codigoDepositante,fecha,hora,usuario)];
  }

}
