export interface AptpResponse{
  "status": Status,
  "requestId": number,
  "processUrl": string,
  //esta seria la url que rediciona al usuario para realizar el pago
  //"https://checkout-co.placetopay.com/session/1/cc9b8690b1f7228c78b759ce27d7e80a"
}
interface Status {
  status: string;
  reason: string;
  message: string;
  date: string;
}