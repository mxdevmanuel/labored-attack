import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const defaultConfig: AxiosRequestConfig = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

export default abstract class BaseHttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(
    baseURL: string,
    options: AxiosRequestConfig = defaultConfig,
  ) {
    this.instance = axios.create({ baseURL, ...options });
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  protected _initializeRequestInterceptor(): void {}
  protected _initializeResponseInterceptor(): void {}
}
