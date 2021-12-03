export enum Action {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export const jwtConstants = {
  secret: 'secretKey',
  duration: '24h',
};

export const cookieConstants = { name: 'auth', secret: 'doubleshot' };
