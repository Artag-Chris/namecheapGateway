import { CrearGiradorDTO, HeaderDTO } from "../..";

export class SolicitudCrearGiradorDTO {

    constructor(
        public readonly headerDTO: HeaderDTO ,
        public readonly crearGiradorDTO: CrearGiradorDTO
    ) {}

    static create(object:{[key:string]:any}): [string?,SolicitudCrearGiradorDTO?]{
        const {headerDTO,crearGiradorDTO} = object;
        //console.log(object);
        if(!headerDTO) return ["El Header es requerido"];
        if(!crearGiradorDTO) return ["El Crear Girador es requerido"];
        
        return [undefined,new SolicitudCrearGiradorDTO(headerDTO,crearGiradorDTO)];
    }
    
}