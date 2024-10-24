import { HeaderDTO } from "../..";
import { CrearPagareDTO } from "./crearPagare.DTO";

export class SolicitudCrearPagareDTO {
    constructor(
        public readonly headerDTO: HeaderDTO,
        public readonly crearPagareDTO: CrearPagareDTO[]
    ) {}

    static create(object: {[key: string]: any}): [string?, SolicitudCrearPagareDTO?] {
        const { headerDTO, crearPagareDTO } = object;

        if (!headerDTO) return ["El Header es requerido"];
        if (!crearPagareDTO) return ["El Crear Pagare es requerido"];
        return [undefined, new SolicitudCrearPagareDTO(headerDTO, [crearPagareDTO])];
    }
}