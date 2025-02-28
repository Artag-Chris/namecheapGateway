import 'dotenv/config';
import { get } from 'env-var';
 

export const envs = {  

  PORT: get('PORT').required().asPortNumber(),
  API_USER: get('API_USER').required().asString(),
  API_KEY: get('API_KEY').required().asString(),
  CLIENT_IP: get('CLIENT_IP').required().asString(),
  API_URL: get('API_URL').required().asString(),
}