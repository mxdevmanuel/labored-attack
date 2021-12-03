import InvalidDataException from '@errors/invaliddata.exception';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import BaseHttpClient from './client.base';
import {
  Profile,
  ProfileDTO,
  LoginDTO,
  User,
  UserPostDTO,
  UserLoginDTO,
  validateUserPostBody,
  validateUserLoginBody,
} from './user.dto';

const baseUrl = 'http://localhost:3000';

enum HttpErrors {
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export default class AuthHttpClient extends BaseHttpClient {
  static HttpErrors = HttpErrors;
  protected token: string = null;
  readonly urls: Record<string, string> = {
    login: '/auth/login',
    register: '/auth/register',
  };

  constructor() {
    super(baseUrl);
  }

  async login(data: UserLoginDTO): Promise<LoginDTO> {
    const validation = await validateUserLoginBody(data);
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

  async profile(): Promise<Profile> {
    const { data } = await this.instance.get<ProfileDTO>('/auth/profile');
    return { username: data.username, id: data.userId };
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
      this._errorHandler,
    );
  }

  protected _errorHandler(error: AxiosError) {
    return Promise.reject(error);
  }
}
