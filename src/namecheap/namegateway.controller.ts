import { Request, Response } from "express";
//import { DecevalGatewayService } from "./namecheapgateway.service";
import { CustomError } from "../domain";
import { NameCheapGatewayService } from "./namecheapgateway.service";

export class NamecheapGatewayController {
  constructor(
    private readonly namecheapGatewayService = new NameCheapGatewayService()
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: `Internal Server Error` });
  };

  // Métodos del controlador
  getDomains = async (req: Request, res: Response) => {
  
    this.namecheapGatewayService
      .getDomains()
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };
  getSubDomains = async (req: Request, res: Response) => {
    const { domain } = req.params;
    
    this.namecheapGatewayService
      .getSubDomains(domain)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  }; 
  getDomainsWithDetails = async (req: Request, res: Response) => {
    this.namecheapGatewayService
      .getDomainsWithDetails()
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  } 

 
}