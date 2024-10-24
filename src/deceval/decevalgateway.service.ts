import XMLAdapter from "../config/adapters/js2xmlparser.adapter";
import { Request, Response } from "express";
import {
  ConsultGiradorDTO,
  ConsultPaymentDTO,
  CrearGiradorDTO,
  CustomError,
  HeaderDTO,
} from "../domain";
import { SolicitudCrearGiradorDTO } from "../domain/dtos/giradores/solicitudCrearGirador.DTO";

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
    if (error) return `error faltan campos ${error}`;

    const xml = XMLAdapter.jsonToXml(
      "solicitudCrearGiradorServiceDTO",
      solicitudCrearGirador
    );
    console.log(xml); // se debera mandar este objeto al proxy y esperar la respuesta
    return xml;
  }
  async consultGirador(consultgiradorDTO: ConsultGiradorDTO): Promise<string> {
    const [error, consultGirador] = ConsultGiradorDTO.create(consultgiradorDTO);
    if (error) return `error faltan campos ${error}`;

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
    if (error) return "error faltan campos";

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
    if (error) return "error faltan campos";

    const xml = XMLAdapter.jsonToXml(
      "consultaPagareServiceDTO",
      consultPayment
    );
    //el xml se envia al proxy
    console.log(xml);
    return xml;
  }

  async onSignPaymentAgreements(payload: any) {
    console.log(payload);
  }
}
