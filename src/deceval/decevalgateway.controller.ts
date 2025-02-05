import { Request, Response } from "express";
import { DecevalGatewayService } from "./decevalgateway.service";
import { CustomError } from "../domain";

export class DecevalGatewayController {
  constructor(
    private readonly decevalGatewayService = new DecevalGatewayService()
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
    this.decevalGatewayService
      .crearGirador(headerDTO, crearGiradorDTO)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };
 

  consultGirador = async (req: Request, res: Response) => {
    const payload = req.body;
    await this.decevalGatewayService
      .consultGirador(payload)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };

  retrieveCertificate = async (req: Request, res: Response) => {
    const payload = req.body;
    await this.decevalGatewayService
      .retrieveCertificate(payload)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };

  infoCertificate = async (req: Request, res: Response) => {
    const payload = req.body;
    await this.decevalGatewayService
      .infoCertificate(payload)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };

  signPaymentAgreements = async (req: Request, res: Response) => {
    const payload = req.body;
    await this.decevalGatewayService
      .onSignPaymentAgreements(payload)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };

  pagaresFirmados = async (req: Request, res: Response) => {
    const payload = req.body;
    await this.decevalGatewayService
      .consultarPagare(payload)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };

  // Nuevo método para crear pagaré
  createPagare = async (req: Request, res: Response) => {
    const payload = req.body;
   // console.log(payload);
    const { header,documentoPagare } = payload;
    this.decevalGatewayService
      .crearPagare(header, documentoPagare)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };
}