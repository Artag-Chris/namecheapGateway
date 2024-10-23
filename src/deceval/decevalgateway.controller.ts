import { Request, Response } from 'express';
import DecevalGatewayService from './decevalgateway.service';
import XMLAdapter from '../config/adapters/js2xmlparser.adapter';




export class DecevalGatewayController {
    constructor(
        private readonly decevalGatewayService = new DecevalGatewayService(),
    ) {}
    
    signPaymentAgreement= async(req:Request, res:Response) =>{
        const payload= req.body;
        
       const xml = XMLAdapter.jsonToXml("Pagare",payload);
       console.log(xml);
        res.status(200).send(xml);
    }
    onConsult= async(req:Request, res:Response) =>{
        const payload= req.body;
       
       
        res.status(200).send("OK");
    }
  

}

