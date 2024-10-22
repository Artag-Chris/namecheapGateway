import { Router } from "express";
import { DecevalGatewayController } from "./decevalgateway.controller";

export class DecevalGatewayRoutes {
  static get routes() {
    const router = Router();

    const decevalgatewayController = new DecevalGatewayController();

    //aqui iran las rutas de los servicios que usaremos de deceval

    router.post(`/pagare`, decevalgatewayController.onLogin);

    router.post(`/consultservice`, decevalgatewayController.onConsult);

    return router;
  }
}
