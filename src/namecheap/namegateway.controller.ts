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
  createGirador = async (req: Request, res: Response) => {
    const payload = req.body;
    const { headerDTO, crearGiradorDTO } = payload;
    this.namecheapGatewayService
      .crearGirador(headerDTO, crearGiradorDTO)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };
 

  consultGirador = async (req: Request, res: Response) => {
    const payload = req.body;
    await this.namecheapGatewayService
      .consultGirador(payload)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };



  pagaresFirmados = async (req: Request, res: Response) => {
    const payload = req.body;
    const { headerDTO, consultaPagareServiceDTO } = payload;
    await this.namecheapGatewayService
      .consultarPagares(headerDTO,consultaPagareServiceDTO)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };

  // Nuevo método para crear pagaré
  createPagare = async (req: Request, res: Response) => {
    const payload = req.body;
   
    const { headerDTO,documentoPagareServiceDTO } = payload;
    this.namecheapGatewayService
      .crearPagare(headerDTO, documentoPagareServiceDTO)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };
}