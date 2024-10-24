export class ArchivoAdjuntoDTO {
    constructor(
       public readonly contenido: string | Buffer,
       public readonly nombreArchivo: string,
    ) {}
    static create(object: {[key: string]: any}): [string?, ArchivoAdjuntoDTO?] {
     const { contenido, nombreArchivo } = object;

        if (!contenido || !nombreArchivo) {
            return ["No se puede crear el archivo adjunto, faltan datos"];
        }

        return [undefined, new ArchivoAdjuntoDTO(contenido,nombreArchivo)];
    }
}