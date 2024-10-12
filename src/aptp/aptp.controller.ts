import { Request, Response } from 'express';
import AptpService from './aptp.service';
//import PrismaService from './prisma.service';



export class AptpController {
    constructor(
        private readonly aptpService = new AptpService(),
    ) {}
    
    onLogin= async(req:Request, res:Response) =>{
        const payload= req.body;
       
        const response =await this.aptpService.onLogin(payload);
        res.status(200).send(response);
    }
  

}

