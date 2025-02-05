class HeaderDTO {
    constructor(
      public readonly codigoDepositante: number,
      public readonly fecha: string,
      public readonly hora: string,
      public readonly usuario: string
    ) {}
  
    static create(object: { [key: string]: any }): HeaderDTO {
      const { codigoDepositante, fecha, hora, usuario } = object;
      return new HeaderDTO(codigoDepositante, fecha, hora, usuario);
    }
  }
  
  export class CrearGiradorDTO {
    constructor(
      public readonly idType: string,
      public readonly idNumber: string,
      public readonly name: string,
      public readonly address: string,
      public readonly city: string,
      public readonly country: string,
      public readonly correoElectronico: string,
      public readonly cuentaGirador: number,
      public readonly direccion1PersonaGrupo_PGP: string,
      public readonly estadoCivil: string,
      public readonly fechaExpedicion_Nat: string,
      public readonly fechaNacimiento_Nat: string,
      public readonly fkIdCiudadDomicilio_Nat: number,
      public readonly fkIdCiudadExpedicion_Nat: number,
      public readonly fkIdClasePersona: number,
      public readonly fkIdDepartamentoDomicilio_Nat: number,
      public readonly fkIdDepartamentoExpedicion_Nat: number,
      public readonly fkIdPaisDomicilio_Nat: number,
      public readonly fkIdPaisExpedicion_Nat: number,
      public readonly fkIdPaisNacionalidad_Nat: number,
      public readonly fkIdTipoDocumento: number,
      public readonly identificacionEmisor: string,
      public readonly mensajeRespuesta: string,
      public readonly nombresNat_Nat: string,
      public readonly numeroDocumento: string,
      public readonly primerApellido_Nat: string,
      public readonly segundoApellido_Nat: string,
      public readonly telefono1PersonaGrupo_PGP: string
    ) {}
  
    static create(object: { [key: string]: any }): CrearGiradorDTO {
      const {
        idType,
        idNumber,
        name,
        address,
        city,
        country,
        correoElectronico,
        cuentaGirador,
        direccion1PersonaGrupo_PGP,
        estadoCivil,
        fechaExpedicion_Nat,
        fechaNacimiento_Nat,
        fkIdCiudadDomicilio_Nat,
        fkIdCiudadExpedicion_Nat,
        fkIdClasePersona,
        fkIdDepartamentoDomicilio_Nat,
        fkIdDepartamentoExpedicion_Nat,
        fkIdPaisDomicilio_Nat,
        fkIdPaisExpedicion_Nat,
        fkIdPaisNacionalidad_Nat,
        fkIdTipoDocumento,
        identificacionEmisor,
        mensajeRespuesta,
        nombresNat_Nat,
        numeroDocumento,
        primerApellido_Nat,
        segundoApellido_Nat,
        telefono1PersonaGrupo_PGP
      } = object;
      return new CrearGiradorDTO(
        idType,
        idNumber,
        name,
        address,
        city,
        country,
        correoElectronico,
        cuentaGirador,
        direccion1PersonaGrupo_PGP,
        estadoCivil,
        fechaExpedicion_Nat,
        fechaNacimiento_Nat,
        fkIdCiudadDomicilio_Nat,
        fkIdCiudadExpedicion_Nat,
        fkIdClasePersona,
        fkIdDepartamentoDomicilio_Nat,
        fkIdDepartamentoExpedicion_Nat,
        fkIdPaisDomicilio_Nat,
        fkIdPaisExpedicion_Nat,
        fkIdPaisNacionalidad_Nat,
        fkIdTipoDocumento,
        identificacionEmisor,
        mensajeRespuesta,
        nombresNat_Nat,
        numeroDocumento,
        primerApellido_Nat,
        segundoApellido_Nat,
        telefono1PersonaGrupo_PGP
      );
    }
  }
  
  export class SolicitudCrearGiradorServiceDTO {
    constructor(
      public readonly header: HeaderDTO,
      public readonly crearGiradorDTO: CrearGiradorDTO[]
    ) {}
  
    static create(object: { [key: string]: any }): SolicitudCrearGiradorServiceDTO {
      const { header, crearGiradorDTO } = object;
      return new SolicitudCrearGiradorServiceDTO(
        HeaderDTO.create(header),
        crearGiradorDTO.map((girador: any) => CrearGiradorDTO.create(girador))
      );
    }
  }