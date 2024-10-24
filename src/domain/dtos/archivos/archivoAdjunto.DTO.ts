export class ArchivoAdjuntoDTO {
    constructor(
       public readonly contenido: string | Buffer,
       public readonly nombreArchivo: string,
    ) {}
}