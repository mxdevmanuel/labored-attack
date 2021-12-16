import { validate } from 'validate.js';
import { Snippet } from './snippet.dto';
import { z } from 'zod';

export interface User {
  id: string;
  username: string;
  snippets?: Snippet[];
  created: Date;
  updated: Date;
}

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
});

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
export type UserPutDTO = Pick<User, 'id'> & PasswordDTO;

const UserPutConstraints = {
  username: {
    presence: { allowEmpty: false },
  },
  confirmPassword: {
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
