import { HeaderDTO } from "../..";

export class SolicitudCrearPagareDTO {
    constructor(
        public readonly headerDTO: HeaderDTO,
        public readonly crearPagareDTO: CrearPagareDTO
    ) {}
}