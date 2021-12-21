import BaseHttpClient from './client.base';
import { take } from './constants';
import { PaginationDTO } from './pagination.dto';
import {
  Snippet,
  SnippetPostDTO,
  SnippetPutDTO,
  validateSnippetPostBody,
  validateSnippetPutBody,
  validateSnippetId,
} from './snippet.dto';
import {
  Profile,
  ProfileDTO,
  LoginDTO,
  User,
  UserPostDTO,
  UserLoginDTO,
  validateUserPostBody,
  validateUserLoginBody,
  UsernamePutDTO,
  validateUsernamePutBody,
  validateUser,
  PasswordPutDTO,
  validatePasswordPutBody,
} from './user.dto';
import InvalidDataException from '@errors/invaliddata.exception';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const baseUrl = 'http://localhost:3000';

enum HttpStatus {
  SUCCESS = 200,
  NO_CONTENT = 204,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export default class AuthHttpClient extends BaseHttpClient {
  static HttpErrors = HttpStatus;
  protected token: string | null = null;
  readonly urls: Record<string, string> = {
    changeUsername: '/auth/profile/username',
    changePassword: '/auth/profile/password',
    createSnippet: '/snippets',
    deleteSnippet: '/snippets',
    getCount: '/snippets/count',
    getMySnippetCount: '/snippets/mine/count',
    getMySnippets: '/snippets/mine',
    getSnippet: '/snippets',
    getSnippets: '/snippets',
    login: '/auth/login',
    logout: '/auth/logout',
    profile: '/auth/profile',
    register: '/auth/register',
    updateSnippet: '/snippets',
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

  async logout(): Promise<boolean> {
    const response = await this.instance.get(this.urls.logout);
    return response.status === HttpStatus.NO_CONTENT;
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
    const { data } = await this.instance.get<ProfileDTO>(this.urls.profile);
    return { username: data.username, id: data.userId };
  }

  async changeUsername(data: UsernamePutDTO): Promise<User> {
    const preValidation = await validateUsernamePutBody(data);
    if (preValidation !== undefined) {
      throw new InvalidDataException(
        'Invalid change username data',
        preValidation,
      );
    }
    const response = await this.instance.put<User>(
      this.urls.changeUsername,
      data,
    );
    console.log(response);
    const postValidation = await validateUser(response.data);
    if (postValidation !== undefined) {
      throw new InvalidDataException('Invalid user data', postValidation);
    }
    return response.data;
  }

  async changePassword(data: PasswordPutDTO): Promise<User> {
    const preValidation = await validatePasswordPutBody(data);
    if (preValidation !== undefined) {
      throw new InvalidDataException(
        'Invalid change password data',
        preValidation,
      );
    }
    const response = await this.instance.put<User>(
      this.urls.changePassword,
      data,
    );

    const postValidation = await validateUser(response.data);
    if (postValidation !== undefined) {
      throw new InvalidDataException('Invalid user data', postValidation);
    }
    return response.data;
  }

  async createSnippet(data: SnippetPostDTO): Promise<Snippet> {
    const validation = await validateSnippetPostBody(data);
    if (validation !== undefined) {
      throw new InvalidDataException('Invalid create user data', validation);
    }
    const response = await this.instance.post<Snippet>(
      this.urls.createSnippet,
      data,
    );
    return response.data;
  }

  async getSnippet(snippetId: string): Promise<Snippet> {
    const validation: { id: string[] } | undefined = await validateSnippetId(
      snippetId,
    );
    if (validation) {
      throw validation;
    }
    const response = await this.instance.get<Snippet>(
      `${this.urls.getSnippet}/${snippetId}`,
    );
    return response.data;
  }

  async getCount(): Promise<number> {
    const response = await this.instance.get<number>(this.urls.getCount);
    return response.data;
  }

  async listSnippets(options: PaginationDTO = { take }): Promise<Snippet[]> {
    const response = await this.instance.get<Snippet[]>(this.urls.getSnippets, {
      params: options,
    });
    return response.data;
  }

  async listMySnippets(options: PaginationDTO = { take }): Promise<Snippet[]> {
    const response = await this.instance.get<Snippet[]>(
      this.urls.getMySnippets,
      {
        params: options,
      },
    );
    return response.data;
  }

  async getMySnippetCount(): Promise<number> {
    const response = await this.instance.get<number>(
      this.urls.getMySnippetCount,
    );
    return response.data;
  }

  async updateSnippet(data: SnippetPutDTO): Promise<Snippet> {
    const validation = await validateSnippetPutBody(data);
    if (validation !== undefined) {
      throw new InvalidDataException('Invalid create user data', validation);
    }
    const { id, ...rest } = data;
    const response = await this.instance.put<Snippet>(
      `${this.urls.getSnippet}/${id}`,
      rest,
    );
    return response.data;
  }

  async deleteSnippet(snippetId: string): Promise<boolean> {
    const validation: { id: string[] } | undefined = await validateSnippetId(
      snippetId,
    );
    if (validation) {
      throw validation;
    }
    const response = await this.instance.delete<string>(
      `${this.urls.deleteSnippet}/${snippetId}`,
    );
    return response.status === HttpStatus.SUCCESS;
  }

  protected _initializeRequestInterceptor() {
    this.instance.interceptors.request.use((request: AxiosRequestConfig) => {
      if (this.token !== null) {
        if (request.headers === undefined) {
          request.headers = {};
        }
        request.headers['Authorization'] = `Bearer ${this.token}`;
      }
      return request;
    });
  }

  protected _initializeResponseInterceptor() {
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
    error.name = 'AxiosError';
    return Promise.reject(error);
  }
}
