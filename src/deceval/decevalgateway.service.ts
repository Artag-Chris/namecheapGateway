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
    crearGiradorDTO: CrearGiradorDTO[]
  ): Promise<any> {
    // const solicitudCrearGirador = {
    //   header: headerDTO,
    //   crearGiradorDTO: crearGiradorDTO
    // };

    // const headerXml = js2xmlparser.parse("header", headerDTO, {
    //   declaration: { include: false },
    //   format: { doubleQuotes: true }
    // });

    // const crearGiradorXml = crearGiradorDTO.map(girador => 
    //   js2xmlparser.parse("crearGiradorDTO", girador, {
    //     declaration: { include: false },
    //     format: { doubleQuotes: true }
    //   })
    // ).join('');

    const soapEnvelope = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
        <soapenv:Header/>
        <soapenv:Body>
          <ser:creacionGiradores xmlns:ser="http://services.proxy.deceval.com/">
            <arg0>
              <header>
                <codigoDepositante>123456789</codigoDepositante>
                <fecha>2025-01-15T12:00:00Z</fecha>
                <hora>12:00:00</hora>
                <usuario>testUser</usuario>
              </header>
              <crearGiradorDTO>
                <direccion2PersonaGrupo_PGP>Address 2</direccion2PersonaGrupo_PGP>
                <tiempoServicio>5 years</tiempoServicio>
                <fkIdDepartamentoDomicilio_Nat>1</fkIdDepartamentoDomicilio_Nat>
                <regitroSuper_Jur>Registro</regitroSuper_Jur>
                <fax2PersonaGrupo_PGP>123456789</fax2PersonaGrupo_PGP>
                <telefono3PersonaGrupo_PGP>123456789</telefono3PersonaGrupo_PGP>
                <fkIdCiudad_Jur>1</fkIdCiudad_Jur>
                <numeroDocumento>1234567890</numeroDocumento>
                <fechaCamara_Jur>2020-01-01</fechaCamara_Jur>
                <mensajeRespuesta>Aprobado</mensajeRespuesta>
                <numeroCelular>1234567890</numeroCelular>
                <fkIdPaisNacionalidad_Nat>1</fkIdPaisNacionalidad_Nat>
                <fkIdClasePersona>1</fkIdClasePersona>
                <fechaNacimiento_Nat>1990-01-01</fechaNacimiento_Nat>
                <fkIdPaisCamara_Jur>1</fkIdPaisCamara_Jur>
                <agenteAutoretenedor_Jur>1</agenteAutoretenedor_Jur>
                <fkIdDepartamentoExpedicion_Nat>1</fkIdDepartamentoExpedicion_Nat>
                <fkIdPais_Jur>1</fkIdPais_Jur>
                <identificacionEmisor>1234567890</identificacionEmisor>
                <direccion1PersonaGrupo_PGP>123 Main St</direccion1PersonaGrupo_PGP>
                <fechaConstitucion_Jur>2020-01-01</fechaConstitucion_Jur>
                <correoElectronico>john.doe@example.com</correoElectronico>
                <libroNo_Jur>123</libroNo_Jur>
                <fechaExpedicion_Nat>2020-01-01</fechaExpedicion_Nat>
                <fkIdCiudadExpedicion_Nat>1</fkIdCiudadExpedicion_Nat>
                <fkIdCiudadDomicilio_Nat>1</fkIdCiudadDomicilio_Nat>
                <residente_Jur>1</residente_Jur>
                <circuloNo_Jur>123</circuloNo_Jur>
                <camaraComercioNo_Jur>123</camaraComercioNo_Jur>
                <segundoApellido_Nat>Smith</segundoApellido_Nat>
                <fkIdTipoDocumento>1</fkIdTipoDocumento>
                <telefono2PersonaGrupo_PGP>123456789</telefono2PersonaGrupo_PGP>
                <pensionado>0</pensionado>
                <notariaNo_Jur>123</notariaNo_Jur>
                <direccion3PersonaGrupo_PGP>Address 3</direccion3PersonaGrupo_PGP>
                <fkIdDepartamento_Jur>1</fkIdDepartamento_Jur>
                <cuentaGirador>123456789</cuentaGirador>
                <fechaEscritura_Jur>2020-01-01</fechaEscritura_Jur>
                <nombresNat_Nat>John</nombresNat_Nat>
                <declarante_Jur>1</declarante_Jur>
                <escrituraNo_Jur>123</escrituraNo_Jur>
                <fax1PersonaGrupo_PGP>123456789</fax1PersonaGrupo_PGP>
                <fkIdPaisExpedicion_Nat>1</fkIdPaisExpedicion_Nat>
                <razonSocial_Jur>Empresa XYZ</razonSocial_Jur>
                <salario>5000</salario>
                <fax3PersonaGrupo_PGP>123456789</fax3PersonaGrupo_PGP>
                <estadoCivil>Soltero</estadoCivil>
                <fkIdPaisDomicilio_Nat>1</fkIdPaisDomicilio_Nat>
                <fkIdCiudadCamara_Jur>1</fkIdCiudadCamara_Jur>
                <fkIdDepartamentoCamara_Jur>1</fkIdDepartamentoCamara_Jur>
                <telefono1PersonaGrupo_PGP>123456789</telefono1PersonaGrupo_PGP>
                <primerApellido_Nat>Doe</primerApellido_Nat>
              </crearGiradorDTO>
            </arg0>
          </ser:creacionGiradores>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    console.log(soapEnvelope); // Imprimir el XML en la consola para depuración

    try {
      // Enviar el XML al proxy
      const response = await axios.post('https://decevalproxy.finova.com.co/services/ProxyServicesImplPort', soapEnvelope, {
        headers: { 'Content-Type': 'text/xml' },
        httpsAgent
      });
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
     // throw new Error(`Error al comunicarse con el proxy: ${String(error)}`);
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