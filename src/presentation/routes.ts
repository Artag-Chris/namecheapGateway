import { Router } from 'express';
import { AptpRoutes } from '../aptp/aptp.routes';


export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    
   
    router.use(`/aptp/cheackout`, AptpRoutes.routes);

    return router;
  }
}

