export interface Payment {
"paymentMethod": string, //deberia ser pse no se si se pueda mandar al final
"reference": string,
"description": string,
"amount": Amount
    
}

export interface Amount {
"currency": string,//deberia ser cop
"total": number
}