
export interface Auth {
    auth: AuthClass;
}

export interface AuthClass {
    login:   string;
    tranKey: string;
    nonce:   string;
    seed:    string;
}
