import XMLAdapter from "../config/adapters/js2xmlparser.adapter";
import {
  ConsultaGiradorServiceDTO,
  ConsultaPagareServiceDTO,
  CrearGiradorDTO,
  HeaderDTO,
  SolicitudPagaresFirmadosDTO,
  DocumentoPagareServiceDTO,

} from "../domain";
import { SolicitudCrearGiradorDTO } from "../domain/dtos/giradores/solicitudCrearGirador.DTO";
import { SolicitudCrearPagareDTO } from "../domain/dtos/pagares/solicitudCrearPagare.DTO";
import https from 'https';
import * as libxmljs from 'libxmljs2';
import * as fs from 'fs';
import axios from "axios";
import * as js2xmlparser from "js2xmlparser";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export class DecevalGatewayService {
  constructor() { }

  
  async crearGirador(
    headerDTO: HeaderDTO,
    crearGiradorDTO: CrearGiradorDTO
  ): Promise<any> {
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
                <fecha>${headerDTO.fecha}</fecha>
                <hora>${headerDTO.hora}</hora>
                <usuario>${headerDTO.usuario}</usuario>
              </header>
            </arg0>
          </ser:creacionGiradoresCodificados>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    //console.log(soapEnvelope); // Imprimir el XML en la consola para depuración

    try {
      // Enviar el XML al proxy
      const response = await axios.post('http://201.236.243.161:9000/SDLProxy/services/ProxyServicesImplPort?wsdl', soapEnvelope, {
        headers: { 'Content-Type': 'text/xml' },
        httpsAgent
      });
      return "ok"
      return response.data;

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
  ): Promise<string> {
    const headerXml = XMLAdapter.jsonToXml(
      "header",
      headerDTO,
      { declaration: { include: false }, format: { doubleQuotes: true } }
    );

    const documentoPagareXml = XMLAdapter.jsonToXml(
      "documentoPagareServiceDTO",
      documentoPagareServiceDTO,
      { declaration: { include: false }, format: { doubleQuotes: true } }
    );

    if (!documentoPagareXml) {
      throw new Error("Error al generar el XML para documentoPagareServiceDTO");
    }

    const soapEnvelope = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://services.proxy.deceval.com/">
        <soapenv:Header/>
        <soapenv:Body>
          <web:creacionPagares>
            <arg0>
              ${headerXml}
              ${documentoPagareXml}
            </arg0>
          </web:creacionPagares>
        </soapenv:Body>
      </soapenv:Envelope>
    `;
    
    // Imprimir el XML en la consola
    console.log("SOAP Envelope:", soapEnvelope);

    // Validar el XML
    // const xsdPath = './schemas/proxyservicesimpl_schema2.xsd'; // Ruta al archivo XSD
    // const xsd = libxmljs.parseXml(fs.readFileSync(xsdPath, 'utf8'));
    // const xml = libxmljs.parseXml(soapEnvelope);

    // if (!xml.validate(xsd)) {
    //   console.error('XML no válido:', xml.validationErrors);
    //   throw new Error('XML no válido');
    // }

    try {
      // Enviar el XML al proxy
      const response = await axios.post('https://decevalproxy.finova.com.co/services/ProxyServicesImplPort', soapEnvelope, {
        headers: { 'Content-Type': 'text/xml' },
        httpsAgent
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error al comunicarse con el proxy:', error);
      throw new Error(`Error al comunicarse con el proxy: ${String(error)}`);
    }
  }
}