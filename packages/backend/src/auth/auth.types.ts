import { User } from '@entities/user.entity';

export type DisplayUser = Omit<User, 'password'>;

export class ValidatedTokenUser {
  userId: string;
  username: string;
}
