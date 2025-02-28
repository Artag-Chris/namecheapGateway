import { Router } from 'express';
import { namecheapGatewayRoutes } from '../namecheap/namecheapgateway.routes';




export class AppRoutes {
  static get routes(): Router {
    const router = Router();
   
    router.use(`/gateway/namecheap`, namecheapGatewayRoutes.routes );

    return router;
  }
}

