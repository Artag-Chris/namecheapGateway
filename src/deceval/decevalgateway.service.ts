import XMLAdapter from "../config/adapters/js2xmlparser.adapter";
import { ConsultGiradorDTO, ConsultPaymentDTO } from "../domain";

export class DecevalGatewayService {
  constructor() {}

  ///se cambiara los metodos
  async crearGirador(payload: any) {
    const xml = XMLAdapter.jsonToXml("Pagare", payload);
    console.log(xml);
    return xml;
  }
  async consultGirador(consultgiradorDTO: ConsultGiradorDTO): Promise<string> {
    const [error, consultGirador] = ConsultGiradorDTO.create(consultgiradorDTO);
    if (error) return "error faltan campos";
    
    const xml = XMLAdapter.jsonToXml("consultaGiradorServiceDTO", consultGirador);
    //el xml se envia al proxy
    console.log(xml);
    return xml;

  }

  async retrieveCertificate(consultPaymentDTO:ConsultPaymentDTO ): Promise<string> {
    const [error, consultPayment] = ConsultPaymentDTO.create(consultPaymentDTO);
    if (error) return "error faltan campos";
    
    const xml = XMLAdapter.jsonToXml("consultaPagareServiceDTO", consultPayment);
    //el xml se envia al proxy
    console.log(xml);
    return xml;
  }

  async onSignPaymentAgreements(payload: any) {
    console.log(payload);
  }
}

