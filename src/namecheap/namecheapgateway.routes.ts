import { Router } from "express";
import { NameCheapGatewayService } from "./namecheapgateway.service";
import { NamecheapGatewayController } from "./namegateway.controller";


export class namecheapGatewayRoutes {
  static get routes() {
    const router = Router();
    const namecheapGatewayService = new NameCheapGatewayService();
    const namecheapgatewayController = new NamecheapGatewayController(namecheapGatewayService);

    router.get("/test", namecheapgatewayController.getDomains);

    return router;
  }
}