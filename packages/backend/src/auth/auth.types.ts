import { User } from '@entities/user.entity';
export type DisplayUser = Omit<User, 'password'>;
