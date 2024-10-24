import XMLAdapter from "../config/adapters/js2xmlparser.adapter";
import {
  ConsultaGiradorServiceDTO,
  ConsultPaymentDTO,
  CrearGiradorDTO,
  HeaderDTO,
  SolicitudPagaresFirmadosDTO,
} from "../domain";
import { SolicitudCrearGiradorDTO } from "../domain/dtos/giradores/solicitudCrearGirador.DTO";
import { SolicitudCrearPagareDTO } from "../domain/dtos/pagares/solicitudCrearPagare.DTO";

export class DecevalGatewayService {
  constructor() {}

  ///se cambiara los metodos
  async crearGirador(
    headerDTO: HeaderDTO,
    crearGiradorDTO: CrearGiradorDTO
  ): Promise<string> {
    const [error, solicitudCrearGirador] = SolicitudCrearGiradorDTO.create({
      headerDTO,
      crearGiradorDTO,
    });
    if (error) return `error ${error}`;

    const xml = XMLAdapter.jsonToXml(
      "solicitudCrearGiradorServiceDTO",
      solicitudCrearGirador
    );
    console.log(xml); // se debera mandar este objeto al proxy y esperar la respuesta
    return xml;
  }
  async consultGirador(
    consultgiradorDTO: ConsultaGiradorServiceDTO
  ): Promise<string> {
    const [error, consultGirador] =
      ConsultaGiradorServiceDTO.create(consultgiradorDTO);
    if (error) return `error  ${error}`;

    const xml = XMLAdapter.jsonToXml(
      "consultaGiradorServiceDTO",
      consultGirador
    );
    //el xml se envia al proxy
    console.log(xml);
    return xml;
  }

  async retrieveCertificate(
    consultPaymentDTO: ConsultPaymentDTO
  ): Promise<string> {
    const [error, consultPayment] = ConsultPaymentDTO.create(consultPaymentDTO);
    if (error) return `error  ${error}`;

    const xml = XMLAdapter.jsonToXml(
      "consultaPagareServiceDTO",
      consultPayment
    );
    //el xml se envia al proxy
    console.log(xml);
    return xml;
  }
  async infoCertificate(payload: any) {
    const [error, consultPayment] = ConsultPaymentDTO.create(payload);
    if (error) return `error  ${error}`;

    const xml = XMLAdapter.jsonToXml(
      "consultaPagareServiceDTO",
      consultPayment
    );
    //el xml se envia al proxy
    console.log(xml);
    return xml;
  }

  async onSignPaymentAgreements(payload: any) {
    const [error, crearPagare] = SolicitudCrearPagareDTO.create(payload);
    if (error) return `error  ${error}`;

    const xml = XMLAdapter.jsonToXml(
      "solicitudCrearPagareServiceDTO",
      crearPagare
    );
    //el xml se envia al proxy
    console.log(xml);
    return xml;
  }
  async consultarPagare(payload: any) {
    const [error, consultarPagare] =
      SolicitudPagaresFirmadosDTO.create(payload);
    if (error) return `error  ${error}`;

    const xml = XMLAdapter.jsonToXml(
      "solicitudPagaresFirmadosDTO",
      consultarPagare
    );
    //el xml se envia al proxy
    console.log(xml);
    return xml;
  }
}
