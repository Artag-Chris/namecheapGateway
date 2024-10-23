import { Request, Response } from "express";
import DecevalGatewayService from "./decevalgateway.service";
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

  createGirador = async (req: Request, res: Response) => {
    const payload = req.body;

    this.decevalGatewayService
      .crearGirador(payload)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };
  retrieveCertificate= async (req: Request, res: Response) => {
    const [error, consultPaymentDTO] = ConsultPaymentDTO.create(req.body);
    if (error) return res.status(400).json({ error });
    

    this.decevalGatewayService
      .retrieveCertificate(consultPaymentDTO!)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };

  signPaymentAgreements = async (req: Request, res: Response) => {
    const payload = req.body;

    this.decevalGatewayService
      .onSignPaymentAgreements(payload)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };
}
