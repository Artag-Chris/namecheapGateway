import { Request, Response } from "express";
import { DecevalGatewayService } from "./decevalgateway.service";
import { ConsultPaymentDTO, CustomError } from "../domain";

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
  //zona girador
  createGirador = async (req: Request, res: Response) => {
    const payload = req.body;
    this.decevalGatewayService
      .crearGirador(payload)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };
  consultGirador = async (req: Request, res: Response) => {
    const payload = req.body;
    await this.decevalGatewayService
      .consultGirador(payload!)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };
  //zona certificado
  retrieveCertificate = async (req: Request, res: Response) => {
    const payload = req.body;
    await this.decevalGatewayService
      .retrieveCertificate(payload!)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };
  infoCertificate = async (req: Request, res: Response) => {
    const payload = req.body;
    await this.decevalGatewayService
      .infoCertificate(payload!)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  }
  //zona acuerdos de pago
  signPaymentAgreements = async (req: Request, res: Response) => {
    const payload = req.body;
    await this.decevalGatewayService
      .onSignPaymentAgreements(payload)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };
}
