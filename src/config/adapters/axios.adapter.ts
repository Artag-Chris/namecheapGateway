import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class HttpClientAdapter {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL: baseURL
    });
  }

  public async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return this.client.get(url, config);
  }

  public async post(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return this.client.post(url, data, config);
  }

  public async put(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return this.client.put(url, data, config);
  }

  public async delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return this.client.delete(url, config);
  }

  public async patch(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return this.client.patch(url, data, config);
  }

  public async head(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return this.client.head(url, config);
  }

  public async options(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return this.client.options(url, config);
  }
}

export default HttpClientAdapter;
