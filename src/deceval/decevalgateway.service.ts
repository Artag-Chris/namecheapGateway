import XMLAdapter from "../config/adapters/js2xmlparser.adapter";

class DecevalGatewayService {
  constructor() {}

  ///se cambiara los metodos
  async crearGirador(payload: any) {
    const xml = XMLAdapter.jsonToXml("Pagare", payload);
    console.log(xml);
    return xml;
  }

  async onRequestConsult(payload: any) {
    console.log(payload);
  }

  async onSignPaymentAgreements(payload: any) {
    console.log(payload);
  }
}
export default DecevalGatewayService;
