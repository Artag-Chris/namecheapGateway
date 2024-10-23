import XMLAdapter from "../config/adapters/js2xmlparser.adapter";

class DecevalGatewayService {
  constructor() {}

  ///se cambiara los metodos
  async signPaymentAgreement(payload: any) {
    const xml = XMLAdapter.jsonToXml("Pagare", payload);
    console.log(xml);
    return xml;
  }

  async onRequestConsult(payload: any) {
    console.log(payload);
  }
}
export default DecevalGatewayService;
