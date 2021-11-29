import { User } from '@entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DisplayUser } from '@auth/auth.types';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ username });
  }

  async create(username: string, rawPassword: string): Promise<DisplayUser> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(rawPassword, salt);
    const user = this.userRepository.create({ username, password });
    const { password: _pass, ...results } = await this.userRepository.save(
      user,
    );
    return results;
  }
}
