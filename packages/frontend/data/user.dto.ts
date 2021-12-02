import { validate } from 'validate.js';
import { Snippet } from './snippet.dto';

export interface User {
  id: string;
  username: string;
  snippets?: Snippet[];
  created: Date;
  updated: Date;
}

export type LoginDTO = {
  access_token: string;
};

type PasswordDTO = {
  password: string;
  oldPassword: string;
};

// Post (create) body
export type UserPostDTO = Pick<User, 'username'> &
  Pick<PasswordDTO, 'password'>;

const UserPostConstraints = {
  username: {
    presence: { allowEmpty: false },
  },
  password: {
    presence: { allowEmpty: false },
  },
};

export const validateUserPostBody = async (
  body: UserPostDTO,
): Promise<Record<string, string[]> | undefined> =>
  validate(body, UserPostConstraints);

// Put (create) body
export type UserPutDTO = Pick<User, 'id'> & PasswordDTO;

const UserPutConstraints = {
  username: {
    presence: { allowEmpty: false },
  },
  oldPassword: {
    presence: { allowEmpty: false },
  },
  password: {
    presence: { allowEmpty: false },
  },
};

export const validateUserPutBody = async (
  body: UserPutDTO,
): Promise<Record<string, string[]> | undefined> =>
  validate(body, UserPutConstraints);
