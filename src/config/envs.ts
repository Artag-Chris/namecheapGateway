import 'dotenv/config';
import { get } from 'env-var';
 

export const envs = {  

  PORT: get('PORT').required().asPortNumber(),
  DATABASE_URL: get('DATABASE_URL').required().asString(),
  LOGINSITE: get('LOGINSITE').required().asString(),
  SECRETKEYAPTP: get('SECRETKEYAPTP').required().asString(),
  RETURNURL: get('RETURNURL').required().asString(),
 
}