import XMLAdapter from "../config/adapters/js2xmlparser.adapter";
import { ConsultPaymentDTO } from "../domain";


class DecevalGatewayService {
  constructor() {}

  ///se cambiara los metodos
  async crearGirador(payload: any) {
    const xml = XMLAdapter.jsonToXml("Pagare", payload);
    console.log(xml);
    return xml;
  }

  async retrieveCertificate(consultPaymentDTO:ConsultPaymentDTO ) {
 
    const xml = XMLAdapter.jsonToXml("consultaPagareServiceDTO", consultPaymentDTO);
    //el xml se envia al proxy
    console.log(xml);
    return xml;
  }

  async onSignPaymentAgreements(payload: any) {
    console.log(payload);
  }
}
export default DecevalGatewayService;
