import { Router } from 'express';
import { DecevalGatewayRoutes } from '../deceval/decevalgateway.routes';



export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    
   
    router.use(`/gateway/deceval`, DecevalGatewayRoutes.routes );

    return router;
  }
}

