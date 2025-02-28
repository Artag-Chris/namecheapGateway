import { envs } from "../envs";

export const createNamecheapServiceParams = (config:string) => {
    const baseParams = {
      "ApiKey": envs.API_KEY,
      "UserName": envs.API_USER,
      "ApiUser": envs.API_USER, 
      "Command": config,
      "ClientIp": envs.CLIENT_IP,
    };
    return baseParams;
  };