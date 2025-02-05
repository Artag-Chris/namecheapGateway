import { HeaderDTO } from "../..";
import { CrearPagareDTO } from "./crearPagare.DTO";

export class SolicitudCrearPagareDTO {
  constructor(
    public readonly headerDTO: HeaderDTO,
    public readonly crearPagareDTO: CrearPagareDTO
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, SolicitudCrearPagareDTO?] {
    const { headerDTO, crearPagareDTO } = object;

    if (!headerDTO) return ["El Header es requerido"];
    if (!crearPagareDTO) return ["El Crear Pagare es requerido"];

    const { transactionId, timestamp, userId, channelId } = headerDTO;

    if (!transactionId) return ["El Transaction ID es requerido"];
    if (!timestamp) return ["El Timestamp es requerido"];
    if (!userId) return ["El User ID es requerido"];
    if (!channelId) return ["El Channel ID es requerido"];

    const {
      pagareId,
      amount,
      currency,
      dueDate,
      debtor,
      creditor
    } = crearPagareDTO;

    if (!pagareId) return ["El Pagare ID es requerido"];
    if (!amount) return ["El Amount es requerido"];
    if (!currency) return ["El Currency es requerido"];
    if (!dueDate) return ["El Due Date es requerido"];

    if (!debtor) return ["El Debtor es requerido"];
    const { idType: debtorIdType, idNumber: debtorIdNumber, name: debtorName, address: debtorAddress, city: debtorCity, country: debtorCountry } = debtor;
    if (!debtorIdType) return ["El Debtor ID Type es requerido"];
    if (!debtorIdNumber) return ["El Debtor ID Number es requerido"];
    if (!debtorName) return ["El Debtor Name es requerido"];
    if (!debtorAddress) return ["El Debtor Address es requerido"];
    if (!debtorCity) return ["El Debtor City es requerido"];
    if (!debtorCountry) return ["El Debtor Country es requerido"];

    if (!creditor) return ["El Creditor es requerido"];
    const { idType: creditorIdType, idNumber: creditorIdNumber, name: creditorName, address: creditorAddress, city: creditorCity, country: creditorCountry } = creditor;
    if (!creditorIdType) return ["El Creditor ID Type es requerido"];
    if (!creditorIdNumber) return ["El Creditor ID Number es requerido"];
    if (!creditorName) return ["El Creditor Name es requerido"];
    if (!creditorAddress) return ["El Creditor Address es requerido"];
    if (!creditorCity) return ["El Creditor City es requerido"];
    if (!creditorCountry) return ["El Creditor Country es requerido"];

    return [undefined, new SolicitudCrearPagareDTO(headerDTO, crearPagareDTO)];
  }
}