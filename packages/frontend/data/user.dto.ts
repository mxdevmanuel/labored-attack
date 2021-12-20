import { validate } from 'validate.js';
import { Snippet } from './snippet.dto';

export interface User {
  id: string;
  username: string;
  snippets?: Snippet[];
  created: Date;
  updated: Date;
}

const UserConstraints = {
  id: { presence: { allowEmpty: false } },
  username: { presence: { allowEmpty: false } },
  snippets: { type: 'array' },
};

export const validateUser = async (
  user: User,
): Promise<Record<string, string[]> | undefined> =>
  validate(user, UserConstraints);

export type ProfileDTO = Pick<User, 'username'> & { userId: string };
export type Profile = Pick<User, 'id' | 'username'>;

export type LoginDTO = {
  access_token: string;
};

type PasswordDTO = {
  password: string;
  confirmPassword: string;
  oldPassword: string;
};

/*
 *
 * User login body DTO and validation
 *   method: POST
 *
 */
export type UserLoginDTO = Pick<User, 'username'> &
  Pick<PasswordDTO, 'password'>;

const UserLoginConstraints = {
  username: {
    presence: { allowEmpty: false },
  },
  password: {
    presence: { allowEmpty: false },
  },
};

export const validateUserLoginBody = async (
  body: UserLoginDTO,
): Promise<Record<string, string[]> | undefined> =>
  validate(body, UserLoginConstraints);

/*
 *
 * User create body DTO and validation
 *   method: POST
 *
 */
export type UserPostDTO = Pick<User, 'username'> &
  Pick<PasswordDTO, 'password' | 'confirmPassword'>;

const UserPostConstraints = {
  username: {
    presence: { allowEmpty: false },
  },
  password: {
    presence: { allowEmpty: false },
  },
  confirmPassword: {
    presence: { allowEmpty: false },
    equality: 'password',
  },
};

export const validateUserPostBody = async (
  body: UserPostDTO,
): Promise<Record<string, string[]> | undefined> =>
  validate(body, UserPostConstraints);

/*
 * User update body DTO and validation
 * method: PUT
 *
 */
export type UsernamePutDTO = Pick<User, 'username'>;

const UsernamePutConstraints = {
  username: {
    presence: { allowEmpty: false },
    length: { maximum: 50 },
  },
};

export const validateUsernamePutBody = async (
  body: UsernamePutDTO,
): Promise<Record<string, string[]> | undefined> =>
  validate(body, UsernamePutConstraints);

/*
 * Password update body DTO and validation
 * method: PUT
 *
 */
export type PasswordPutDTO = PasswordDTO;

const PasswordPutConstraints = {
  password: {
    presence: { allowEmpty: false },
  },
  confirmPassword: {
    presence: { allowEmpty: false },
    equality: 'password',
  },
  oldPassword: {
    presence: { allowEmpty: false },
  },
};

export const validatePasswordPutBody = async (
  body: PasswordPutDTO,
): Promise<Record<string, string[]> | undefined> =>
  validate(body, PasswordPutConstraints);
