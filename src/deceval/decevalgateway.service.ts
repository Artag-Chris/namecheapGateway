import XMLAdapter from "../config/adapters/js2xmlparser.adapter";
import { ConsultGiradorDTO, ConsultPaymentDTO, CrearGiradorDTO, HeaderDTO } from "../domain";
import { SolicitudCrearGiradorDTO } from "../domain/dtos/giradores/solicitudCrearGirador.DTO";

export class DecevalGatewayService {
  constructor() {}

  ///se cambiara los metodos
  async crearGirador(header: HeaderDTO,crearGiradorDTO: CrearGiradorDTO): Promise<string> {
    
    const headerdto = HeaderDTO.create(header);
 //console.log(header);
    const  giradordto = CrearGiradorDTO.create(crearGiradorDTO);
   
   //console.log(creargirador);
  
   //console.log(headergirador);
   
    // const [error, solicitudCrearGirador] = SolicitudCrearGiradorDTO.create({header,crearGiradorDTO});
    // console.log(solicitudCrearGirador)
    // if (error) return "error faltan campos";
    const xml = XMLAdapter.jsonToXml("solicitudCrearGiradorServiceDTO", {header,crearGiradorDTO});
    console.log(xml);
    return xml;
    
   return "ok";
  }
  async consultGirador(consultgiradorDTO: ConsultGiradorDTO): Promise<string> {
    const [error, consultGirador] = ConsultGiradorDTO.create(consultgiradorDTO);
    if (error) return "error faltan campos";
    
    const xml = XMLAdapter.jsonToXml("consultaGiradorServiceDTO", consultGirador);
    //el xml se envia al proxy
    console.log(xml);
    return xml;

  }

  async retrieveCertificate(consultPaymentDTO:ConsultPaymentDTO ): Promise<string> {
    const [error, consultPayment] = ConsultPaymentDTO.create(consultPaymentDTO);
    if (error) return "error faltan campos";
    
    const xml = XMLAdapter.jsonToXml("consultaPagareServiceDTO", consultPayment);
    //el xml se envia al proxy
    console.log(xml);
    return xml;
  }
  async infoCertificate(payload: any) {
    const [error, consultPayment] = ConsultPaymentDTO.create(payload);
    if (error) return "error faltan campos";
    
    const xml = XMLAdapter.jsonToXml("consultaPagareServiceDTO", consultPayment);
    //el xml se envia al proxy
    console.log(xml);
    return xml;
  }

  async onSignPaymentAgreements(payload: any) {
    console.log(payload);
  }
}

