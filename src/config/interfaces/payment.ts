export interface Payment {

"reference": string,
"description": string,
"amount": Amount
    
}

export interface Amount {
"currency": string,//deberia ser cop
"total": number
}