import { Router } from "express";
import { NameCheapGatewayService } from "./namecheapgateway.service";
import { NamecheapGatewayController } from "./namegateway.controller";


export class namecheapGatewayRoutes {
  static get routes() {
    const router = Router();
    const namecheapGatewayService = new NameCheapGatewayService();
    const namecheapgatewayController = new NamecheapGatewayController(namecheapGatewayService);

    // Aquí irán las rutas de los servicios que usaremos de Deceval
    // Organizar rutas 

    router.post(`/creargirador`, namecheapgatewayController.createGirador);
    router.post(`/consultargirador`, namecheapgatewayController.consultGirador);
    
    router.post(`/pagaresfirmados`, namecheapgatewayController.pagaresFirmados);
    
     

    // Nueva ruta para crear pagaré
    router.post(`/crearpagare`, namecheapgatewayController.createPagare);

    return router;
  }
}