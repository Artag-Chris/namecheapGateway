import axios from "axios";
import { envs } from "../envs";
import { createNamecheapServiceParams } from "./createParams";

export const executeCommand = (command: string, extraParams: any = {}): Promise<any> => {
    const params = {
      ...createNamecheapServiceParams(command),
      ...extraParams
    };

    return axios.get(envs.API_URL, { params });
}