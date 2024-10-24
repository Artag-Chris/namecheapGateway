import { Router } from "express";
import { DecevalGatewayController } from "./decevalgateway.controller";
import {DecevalGatewayService} from "./decevalgateway.service";

export class DecevalGatewayRoutes {
  static get routes() {
    const router = Router();
    const decevalGatewayService = new DecevalGatewayService();
    const decevalgatewayController = new DecevalGatewayController(decevalGatewayService);

    //aqui iran las rutas de los servicios que usaremos de deceval
    // organizar rutas

    router.post(`/creargirador`, decevalgatewayController.createGirador);
    router.post('/consultargirador',decevalgatewayController.consultGirador);

    router.post(`/signpayment`, decevalgatewayController.signPaymentAgreements);
    router.post(`/pagaresfirmados`,decevalgatewayController.pagaresFirmados );

    router.post(`/blindsing`, );

    router.post(`/terminatePayment`, );

    router.post(`/retrieveCertificates`,decevalgatewayController.retrieveCertificate );
    router.post('/infocertificate',decevalgatewayController.infoCertificate );

    router.post(`/consultservice`, );

    return router;
  }
}
