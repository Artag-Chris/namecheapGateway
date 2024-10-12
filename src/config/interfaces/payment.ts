export interface Payment {

"reference": string,
"description": string,
"amount": amount
    
}

interface amount {
"currency": string,//deberia ser cop
"total": number
}