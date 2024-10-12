import * as crypto from 'crypto';
import { AuthClass } from '../interfaces';
import{envs} from '../envs';

export function getAuth() {
    
const login = envs.LOGINSITE;
const secretKey = envs.SECRETKEYAPTP;
const seed = new Date().toISOString();
const rawNonce = Math.floor(Math.random() * 1000000);

const tranKey = Buffer.from(
    new Uint8Array(
      crypto.createHash('sha256').update(rawNonce + seed + secretKey).digest()
    )
  ).toString('base64');

const nonce = Buffer.from(rawNonce.toString()).toString('base64');

const auth:AuthClass=
 {
    login: login,
    tranKey: tranKey,
    nonce: nonce, //Valor aleatorio para cada solicitud codificado en Base64.
    seed: seed, //fecha en formato especifico formato ISO 8601
  }

return auth;
}