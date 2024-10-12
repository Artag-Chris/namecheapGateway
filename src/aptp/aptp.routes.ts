import { Router } from "express";
import { AptpController } from "./aptp.controller";

export class AptpRoutes {


    static get routes(){ 
    const router= Router();
    
    const aptpController =new AptpController();

    //aqui iran las rutas de a place to pay sus metodos son todos post

    router.post(`/login`,aptpController.onLogin);
  
    router.post(`consultservice`,aptpController.onConsult);

    

return router;
 }
}