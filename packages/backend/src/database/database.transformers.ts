import { ValueTransformer } from 'typeorm';

export const lowercase: ValueTransformer = {
  from: (value: string) => value,
  to: (value: string) => value.toLowerCase(),
};
