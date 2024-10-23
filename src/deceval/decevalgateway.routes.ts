import { Router } from "express";
import { DecevalGatewayController } from "./decevalgateway.controller";

export class DecevalGatewayRoutes {
  static get routes() {
    const router = Router();

    const decevalgatewayController = new DecevalGatewayController();

    //aqui iran las rutas de los servicios que usaremos de deceval

    router.post(`/creargirador`, decevalgatewayController.createGirador);

    router.post(`/signpayment`, decevalgatewayController.signPaymentAgreements);

    router.post(`/blindsing`, );

    router.post(`/terminatePayment`, );

    router.post(`/retrieveCertificates`, );

    router.post(`/consultservice`, decevalgatewayController.onConsult);

    return router;
  }
}
