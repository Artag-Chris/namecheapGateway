import { HeaderDTO } from "../..";
import { CrearPagareDTO } from "./crearPagare.DTO";

export class SolicitudCrearPagareDTO {
    constructor(
        public readonly headerDTO: HeaderDTO,
        public readonly crearPagareDTO: CrearPagareDTO[]
    ) {}

    static create(object: {[key: string]: any}): [string?, SolicitudCrearPagareDTO?] {
        const { header, crearPagareDTO } = object;
    console.log(object);
        if (!header) return ["El Header es requerido"];
        if (!crearPagareDTO) return ["El Crear Pagare es requerido"];
        return [undefined, new SolicitudCrearPagareDTO(header, [crearPagareDTO])];
    }
}