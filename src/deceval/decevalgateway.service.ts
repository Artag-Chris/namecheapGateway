import XMLAdapter from "../config/adapters/js2xmlparser.adapter";
import {
  ConsultaGiradorServiceDTO,
  ConsultaPagareServiceDTO,
  CrearGiradorDTO,
  HeaderDTO,
  SolicitudPagaresFirmadosDTO,
  DocumentoPagareServiceDTO,
} from "../domain";
import { SolicitudCrearPagareDTO } from "../domain/dtos/pagares/solicitudCrearPagare.DTO";
import https from 'https';
import axios from "axios";
import { parseStringPromise } from 'xml2js';

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export class DecevalGatewayService {
  constructor() { }

  
  async crearGirador(
    headerDTO: HeaderDTO,
    crearGiradorDTO: CrearGiradorDTO
  ): Promise<any> {
    const currentDateTime = new Date().toISOString().split('.')[0]; // YYYY-MM-DDTHH:MM:SS format
    const currentTime = new Date().toISOString().split('T')[1].split('.')[0]; // HH:MM:SS format

    const soapEnvelope = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.proxy.deceval.com/">
      <soapenv:Header/>
      <soapenv:Body>
        <ser:creacionGiradoresCodificados>
        <arg0>
          <crearGiradorDTO>
          <identificacionEmisor>${crearGiradorDTO.identificacionEmisor}</identificacionEmisor>
          <fkIdClasePersona>${crearGiradorDTO.fkIdClasePersona}</fkIdClasePersona>
          <fkIdTipoDocumento>${crearGiradorDTO.fkIdTipoDocumento}</fkIdTipoDocumento>
          <numeroDocumento>${crearGiradorDTO.numeroDocumento}</numeroDocumento>
          <correoElectronico>${crearGiradorDTO.correoElectronico}</correoElectronico>
          <direccion1PersonaGrupo_PGP>${crearGiradorDTO.direccion1PersonaGrupo_PGP}</direccion1PersonaGrupo_PGP>
          <telefono1PersonaGrupo_PGP>${crearGiradorDTO.telefono1PersonaGrupo_PGP}</telefono1PersonaGrupo_PGP>
          <fax1PersonaGrupo_PGP>${crearGiradorDTO.fax1PersonaGrupo_PGP}</fax1PersonaGrupo_PGP>
          <fkIdPaisExpedicion_Nat>${crearGiradorDTO.fkIdPaisExpedicion_Nat}</fkIdPaisExpedicion_Nat>
          <fkIdDepartamentoExpedicion_Nat>${crearGiradorDTO.fkIdDepartamentoExpedicion_Nat}</fkIdDepartamentoExpedicion_Nat>
          <fkIdCiudadExpedicion_Nat>${crearGiradorDTO.fkIdCiudadExpedicion_Nat}</fkIdCiudadExpedicion_Nat>
          <fkIdPaisDomicilio_Nat>${crearGiradorDTO.fkIdPaisDomicilio_Nat}</fkIdPaisDomicilio_Nat>
          <fkIdDepartamentoDomicilio_Nat>${crearGiradorDTO.fkIdDepartamentoDomicilio_Nat}</fkIdDepartamentoDomicilio_Nat>
          <fkIdCiudadDomicilio_Nat>${crearGiradorDTO.fkIdCiudadDomicilio_Nat}</fkIdCiudadDomicilio_Nat>
          <fechaExpedicion_Nat>${crearGiradorDTO.fechaExpedicion_Nat}</fechaExpedicion_Nat>
          <fechaNacimiento_Nat>${crearGiradorDTO.fechaNacimiento_Nat}</fechaNacimiento_Nat>
          <nombresNat_Nat>${crearGiradorDTO.nombresNat_Nat}</nombresNat_Nat>
          <primerApellido_Nat>${crearGiradorDTO.primerApellido_Nat}</primerApellido_Nat>
          <segundoApellido_Nat>${crearGiradorDTO.segundoApellido_Nat}</segundoApellido_Nat>
          <fkIdPaisNacionalidad_Nat>${crearGiradorDTO.fkIdPaisNacionalidad_Nat}</fkIdPaisNacionalidad_Nat>
          <mensajeRespuesta>${crearGiradorDTO.mensajeRespuesta}</mensajeRespuesta>
          </crearGiradorDTO>
          <header>
          <codigoDepositante>${headerDTO.codigoDepositante}</codigoDepositante>
          <fecha>${currentDateTime}</fecha>
          <hora>${currentTime}</hora>
          <usuario>${headerDTO.usuario}</usuario>
          </header>
        </arg0>
        </ser:creacionGiradoresCodificados>
      </soapenv:Body>
      </soapenv:Envelope>
    `;


    try {
      // Enviar el XML al proxy
      const response = await axios.post('http://201.236.243.161:9000/SDLProxy/services/ProxyServicesImplPort?wsdl', soapEnvelope, {
        headers: { 'Content-Type': 'text/xml' },
        httpsAgent
      });
     
       // Convertir la respuesta XML a JSON
       const jsonResponse = await parseStringPromise(response.data);

       // Agregar nuevos campos al JSON
       jsonResponse.nuevocampo = 'valor nuevo';
       jsonResponse.nuevocampo2 = 'valor nuevo 2';
 
       return jsonResponse;
     // return response.data;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error al comunicarse con el proxy:', {
          message: error.message,
          code: error.code,
          response: error.response?.data,
          config: error.config,
        });
      } else {
        console.error('Error desconocido:', error);
      }
      throw new Error(`Error al comunicarse con el proxy: ${String(error)}`);
    }
  }

      async consultGirador(
    consultgiradorDTO: ConsultaGiradorServiceDTO
  ): Promise<string> {
    const [error, consultGirador] =
      ConsultaGiradorServiceDTO.create(consultgiradorDTO);
    if (error) return `error  ${String(error)}`;

    const xml = XMLAdapter.jsonToXml(
      "consultaGiradorServiceDTO",
      consultGirador,
      { declaration: { include: false }, format: { doubleQuotes: true } }
    );
    const namespacedXml = `<consultaGiradorServiceDTO xmlns="http://services.proxy.deceval.com/">${xml}</consultaGiradorServiceDTO>`;
  //  console.log(namespacedXml); // el xml se envia al proxy

    try {
      // Enviar el XML al proxy
      const response = await axios.post('https://decevalproxy.finova.com.co/services/ProxyServicesImplPort', namespacedXml, {
        headers: { 'Content-Type': 'application/xml' },
        httpsAgent
      });
      return response.data;
    } catch (error) {
      console.error('Error al comunicarse con el proxy:', error);
      throw new Error(`Error al comunicarse con el proxy: ${String(error)}`);
    }
  }

  async retrieveCertificate(
    consultaPaymentDTO: ConsultaPagareServiceDTO
  ): Promise<string> {
    const [error, consultPayment] = ConsultaPagareServiceDTO.create(consultaPaymentDTO);
    if (error) return `error  ${String(error)}`;

    const xml = XMLAdapter.jsonToXml(
      "consultaPagareServiceDTO",
      consultPayment,
      { declaration: { include: false }, format: { doubleQuotes: true } }
    );
    const namespacedXml = `<consultaPagareServiceDTO xmlns="http://services.proxy.deceval.com/">${xml}</consultaPagareServiceDTO>`;
    console.log(namespacedXml); // el xml se envia al proxy

    try {
      // Enviar el XML al proxy
      const response = await axios.post('https://decevalproxy.finova.com.co/services/ProxyServicesImplPort', namespacedXml, {
        headers: { 'Content-Type': 'application/xml' },
        httpsAgent
      });
      return response.data;
    } catch (error) {
      console.error('Error al comunicarse con el proxy:', error);
      throw new Error(`Error al comunicarse con el proxy: ${String(error)}`);
    }
  }

  async infoCertificate(payload: any) {
    const [error, consultPayment] = ConsultaPagareServiceDTO.create(payload);
    if (error) return `error  ${String(error)}`;

    const xml = XMLAdapter.jsonToXml(
      "consultaPagareServiceDTO",
      consultPayment,
      { declaration: { include: false }, format: { doubleQuotes: true } }
    );
    const namespacedXml = `<consultaPagareServiceDTO xmlns="http://services.proxy.deceval.com/">${xml}</consultaPagareServiceDTO>`;
    console.log(namespacedXml); // el xml se envia al proxy

    try {
      // Enviar el XML al proxy
      const response = await axios.post('https://decevalproxy.finova.com.co/services/ProxyServicesImplPort', namespacedXml, {
        headers: { 'Content-Type': 'application/xml' },
        httpsAgent
      });
      return response.data;
    } catch (error) {
      console.error('Error al comunicarse con el proxy:', error);
      throw new Error(`Error al comunicarse con el proxy: ${String(error)}`);
    }
  }

  async onSignPaymentAgreements(payload: any) {
    const [error, crearPagare] = SolicitudCrearPagareDTO.create(payload);
    if (error) return `error  ${String(error)}`;

    const xml = XMLAdapter.jsonToXml(
      "solicitudCrearPagareServiceDTO",
      crearPagare,
      { declaration: { include: false }, format: { doubleQuotes: true } }
    );
    const namespacedXml = `<solicitudCrearPagareServiceDTO xmlns="http://services.proxy.deceval.com/">${xml}</solicitudCrearPagareServiceDTO>`;
    console.log(namespacedXml); // el xml se envia al proxy

    try {
      // Enviar el XML al proxy
      const response = await axios.post('https://decevalproxy.finova.com.co/services/ProxyServicesImplPort', namespacedXml, {
        headers: { 'Content-Type': 'application/xml' },
        httpsAgent
      });
      return response.data;
    } catch (error) {
      console.error('Error al comunicarse con el proxy:', error);
      throw new Error(`Error al comunicarse con el proxy: ${String(error)}`);
    }
  }

  async consultarPagare(payload: any) {
    const [error, consultarPagare] =
      SolicitudPagaresFirmadosDTO.create(payload);
    if (error) return `error  ${String(error)}`;

    const xml = XMLAdapter.jsonToXml(
      "solicitudPagaresFirmadosDTO",
      consultarPagare,
      { declaration: { include: false }, format: { doubleQuotes: true } }
    );
    const namespacedXml = `<solicitudPagaresFirmadosDTO xmlns="http://services.proxy.deceval.com/">${xml}</solicitudPagaresFirmadosDTO>`;
    console.log(namespacedXml); // el xml se envia al proxy

    try {
      // Enviar el XML al proxy
      const response = await axios.post('https://decevalproxy.finova.com.co/services/ProxyServicesImplPort', namespacedXml, {
        headers: { 'Content-Type': 'application/xml' },
        httpsAgent
      });
      return response.data;
    } catch (error) {
      console.error('Error al comunicarse con el proxy:', error);
      throw new Error(`Error al comunicarse con el proxy: ${String(error)}`);
    }
  }

  // Nuevo método para crear pagaré
  
  async crearPagare(
    headerDTO: HeaderDTO,
    documentoPagareServiceDTO: DocumentoPagareServiceDTO
  ): Promise<any> {
    const currentDateTime = new Date().toISOString().split('.')[0]; // YYYY-MM-DDTHH:MM:SS format
    const currentTime = new Date().toISOString().split('T')[1].split('.')[0]; // HH:MM:SS format
 //console.log(headerDTO);

    const soapEnvelope = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.proxy.deceval.com/">
        <soapenv:Header/>
        <soapenv:Body>
          <ser:creacionPagaresCodificado>
            <arg0>
              <documentoPagareServiceDTO>
                <nitEmisor>${documentoPagareServiceDTO.nitEmisor}</nitEmisor>
                <idClaseDefinicionDocumento>${documentoPagareServiceDTO.idClaseDefinicionDocumento}</idClaseDefinicionDocumento>
                <fechaGrabacionPagare>${documentoPagareServiceDTO.fechaGrabacionPagare}</fechaGrabacionPagare>
                <tipoPagare>${documentoPagareServiceDTO.tipoPagare}</tipoPagare>
                <numPagareEntidad>${documentoPagareServiceDTO.numPagareEntidad}</numPagareEntidad>
                <fechaDesembolso>${documentoPagareServiceDTO.fechaDesembolso}</fechaDesembolso>
                <otorganteTipoId>${documentoPagareServiceDTO.otorganteTipoId}</otorganteTipoId>
                <otorganteNumId>${documentoPagareServiceDTO.otorganteNumId}</otorganteNumId>
                <otorganteCuenta>${documentoPagareServiceDTO.otorganteCuenta}</otorganteCuenta>
                <creditoReembolsableEn>${documentoPagareServiceDTO.creditoReembolsableEn}</creditoReembolsableEn>
                <valorPesosDesembolso>${documentoPagareServiceDTO.valorPesosDesembolso}</valorPesosDesembolso>
                <ciudadDesembolso>${documentoPagareServiceDTO.ciudadDesembolso}</ciudadDesembolso>
                <departamento>${documentoPagareServiceDTO.departamento}</departamento>
                <pais>${documentoPagareServiceDTO.pais}</pais>
                <tasaInteres>${documentoPagareServiceDTO.tasaInteres}</tasaInteres>
              </documentoPagareServiceDTO>
              <header>
                <codigoDepositante>${headerDTO.codigoDepositante}</codigoDepositante>
                <fecha>${currentDateTime}</fecha>
                <hora>${currentTime}</hora>
                <usuario>${headerDTO.usuario}</usuario>
              </header>
            </arg0>
          </ser:creacionPagaresCodificado>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    //console.log("SOAP Envelope:", soapEnvelope); // Imprimir el XML en la consola para depuración

    try {
      // Enviar el XML al proxy
      const response = await axios.post('http://201.236.243.161:9000/SDLProxy/services/ProxyServicesImplPort?wsdl', soapEnvelope, {
        headers: { 'Content-Type': 'text/xml' },
        httpsAgent
      });

      // Convertir la respuesta XML a JSON
      const jsonResponse = await parseStringPromise(response.data);

      // Agregar nuevos campos al JSON
      jsonResponse.newField1 = 'value1';
      jsonResponse.newField2 = 'value2';

      console.log(jsonResponse); // Imprimir la respuesta JSON en la consola para depuración
      return jsonResponse;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error al comunicarse con el proxy:', {
          message: error.message,
          code: error.code,
          response: error.response?.data,
          config: error.config,
        });
      } else {
        console.error('Error desconocido:', error);
      }
      throw new Error(`Error al comunicarse con el proxy: ${String(error)}`);
    }
  }
}



/*
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.proxy.deceval.com/">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:creacionPagaresCodificado>
         <arg0>
            <documentoPagareServiceDTO>
               <nitEmisor>8001820912</nitEmisor> //nit de finova
               <idClaseDefinicionDocumento>3</idClaseDefinicionDocumento> // definirlo
               <fechaGrabacionPagare>2025-02-05T08:45:00</fechaGrabacionPagare> //fecha creacion pagare
               <tipoPagare>1</tipoPagare> //tipo de pagare
               <numPagareEntidad>PAGARE_$123456</numPagareEntidad>//numero otorgogado por finova debe ser unico para todos los pagares usar uuido fechas
               <fechaDesembolso>2025-02-05T08:45:00</fechaDesembolso> //fecha desembolso
               <otorganteTipoId>1</otorganteTipoId> //preguntar por este campo
               <otorganteNumId>800941000</otorganteNumId> //cedula de la persona que otorga el pagare
               <otorganteCuenta>103869</otorganteCuenta>//cuenta de la persona que otorga el pagare nosotros?
               <creditoReembolsableEn>2</creditoReembolsableEn> //numero de cuotas
               <valorPesosDesembolso>1500000</valorPesosDesembolso>//valor total del pagare
               <ciudadDesembolso>11001</ciudadDesembolso> //buscar id de la ciudad
               <departamento>11</departamento>//buscar id del departamento
               <pais>CO</pais>
               <tasaInteres>1</tasaInteres>//tase de interes del pagare
            </documentoPagareServiceDTO>
            <header>
               <codigoDepositante>142</codigoDepositante>
               <fecha>2025-02-05T08:45:00</fecha>
               <hora>08:45</hora>
               <usuario>hnarvaez</usuario>
            </header>
         </arg0>
      </ser:creacionPagaresCodificado>
   </soapenv:Body>
</soapenv:Envelope>
*/