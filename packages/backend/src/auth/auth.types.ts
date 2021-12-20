import { User } from '@entities/user.entity';

export type DisplayUser = Omit<User, 'password'>;

export class ValidatedTokenUser {
  userId: string;
  username: string;
}

export class WrongPasswordException extends Error {
  name = 'WrongPasswordException';
  /**
   * Sets default message
   */
  constructor() {
    super('Wrong password');
  }
}
