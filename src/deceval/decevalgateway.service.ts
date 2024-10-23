import XMLAdapter from "../config/adapters/js2xmlparser.adapter";
import { ConsultPaymentDTO } from "../domain";

export class DecevalGatewayService {
  constructor() {}

  ///se cambiara los metodos
  async crearGirador(payload: any) {
    const xml = XMLAdapter.jsonToXml("Pagare", payload);
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

