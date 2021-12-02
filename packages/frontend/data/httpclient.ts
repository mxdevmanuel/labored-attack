import InvalidDataException from '@errors/invaliddata.exception';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import BaseHttpClient from './client.base';
import { LoginDTO, User, UserPostDTO, validateUserPostBody } from './user.dto';

const baseUrl = 'http://localhost:3000';

export default class AuthHttpClient extends BaseHttpClient {
  protected token: string = null;
  readonly urls: Record<string, string> = {
    login: '/auth/login',
    register: '/auth/register',
  };

  constructor() {
    super(baseUrl);
  }

  async login(data: UserPostDTO): Promise<LoginDTO> {
    const validation = await validateUserPostBody(data);
    if (validation !== undefined) {
      throw new InvalidDataException('Invalid login data', validation);
    }
    const response = await this.instance.post<LoginDTO>(this.urls.login, data);
    return response.data;
  }

  async register(data: UserPostDTO): Promise<User> {
    const validation = await validateUserPostBody(data);
    if (validation !== undefined) {
      throw new InvalidDataException('Invalid create user data', validation);
    }
    const response = await this.instance.post<User>(this.urls.register, data);
    return response.data;
  }

  _initializeRequestInterceptor() {
    this.instance.interceptors.request.use((request: AxiosRequestConfig) => {
      if (this.token !== null) {
        request.headers['Authorization'] = `Bearer ${this.token}`;
      }
      return request;
    });
  }

  _initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      (response: AxiosResponse<LoginDTO>) => {
        if (response.config.url === this.urls.login) {
          this.token = response.data.access_token;
        }
        return response;
      },
    );
  }
}
