import { Router } from "express";
import { DecevalGatewayController } from "./decevalgateway.controller";
import { DecevalGatewayService } from "./decevalgateway.service";

export class DecevalGatewayRoutes {
  static get routes() {
    const router = Router();
    const decevalGatewayService = new DecevalGatewayService();
    const decevalgatewayController = new DecevalGatewayController(decevalGatewayService);

    // Aquí irán las rutas de los servicios que usaremos de Deceval
    // Organizar rutas

    router.post(`/creargirador`, decevalgatewayController.createGirador);
    router.post(`/consultargirador`, decevalgatewayController.consultGirador);
    
    router.post(`/pagaresfirmados`, decevalgatewayController.pagaresFirmados);
    router.post(`/retrieveCertificates`, decevalgatewayController.retrieveCertificate);
    

    // Nueva ruta para crear pagaré
    router.post(`/crearpagare`, decevalgatewayController.createPagare);

    return router;
  }
}