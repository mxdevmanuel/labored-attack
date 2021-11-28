import { User } from '@entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ username });
  }

  async create(username: string, password: string): Promise<User> {
    const user = this.userRepository.create({ username, password });
    return await this.userRepository.save(user);
  }
}
