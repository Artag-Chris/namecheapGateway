export class ConsultGiradorDTO {
  constructor(
    public readonly giradorCuenta: number,
    public readonly giradorNumId: string,
    public readonly giradorTipoId: number,
    public readonly idPersonaRepresentada: number,
    public readonly idRol: number
  ) {}


static create(object:{[key:string]:any}): [string?,ConsultGiradorDTO?] {
const {
    
    giradorCuenta,
    giradorNumId,
    giradorTipoId,
    idPersonaRepresentada,
    idRol

} = object

if(!giradorCuenta) return ["El Cuenta Girador es requerido"];
if(!giradorNumId) return ["El Num Id Girador es requerido"];
if(!giradorTipoId) return ["El Tipo Id Girador es requerido"];
if(!idPersonaRepresentada) return ["El Id Persona Representada es requerido"];
if(!idRol) return ["El Id Rol es requerido"];

return [undefined,new ConsultGiradorDTO(giradorCuenta,giradorNumId,giradorTipoId,idPersonaRepresentada,idRol)]

}

}
