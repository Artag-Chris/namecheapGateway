import { Request, Response } from 'express';
import DecevalGatewayService from './decevalgateway.service';




export class DecevalGatewayController {
    constructor(
        private readonly decevalGatewayService = new DecevalGatewayService(),
    ) {}
    
    onLogin= async(req:Request, res:Response) =>{
        const payload= req.body;
        
        
        res.status(200).send("OK");
    }
    onConsult= async(req:Request, res:Response) =>{
        const payload= req.body;
       
       
        res.status(200).send("OK");
    }
  

}

