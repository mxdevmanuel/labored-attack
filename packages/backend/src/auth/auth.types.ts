import { User } from '@entities/user.entity';

export type DisplayUser = Omit<User, 'password'>;

export class ValidTokenUser {
  userId: string;
  username: string;
}
