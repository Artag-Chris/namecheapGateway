import { Request, Response } from 'express';
import AptpService from './aptp.service';
//import PrismaService from './prisma.service';



export class AptpController {
    constructor(
        private readonly aptpService = new AptpService(),
    ) {}
    
    onLogin= async(req:Request, res:Response) =>{
        const payload= req.body;
        const {reference, description, amount,ipAddress, userAgent } = payload;
        const userAgentValue = userAgent !== null && userAgent !== undefined ? userAgent : 'Desconocido';
        const response =await this.aptpService.onRequestLogin(reference, description, amount,ipAddress, userAgentValue,);
        
        res.status(200).send(response);
    }
    onConsult= async(req:Request, res:Response) =>{
        const payload= req.body;
       
        const response =await this.aptpService.onRequestConsult(payload);
        res.status(200).send(response);
    }
  

}

