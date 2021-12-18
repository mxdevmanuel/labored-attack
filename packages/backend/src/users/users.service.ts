import { User } from '@entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DisplayUser } from '@auth/auth.types';
import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';

// TODO: refactor to automatically hide password from model
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(usernamer: string): Promise<User | undefined> {
    const username = usernamer.toLowerCase();
    return this.userRepository.findOneOrFail({ username });
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

  async changeUsername(
    oldUsername: string,
    newUsername: string,
  ): Promise<User> {
    try {
      const prospect = await this.userRepository.find({
        where: { username: newUsername },
      });
      if (_.isNil(prospect)) {
        const user = await this.userRepository.findOneOrFail({
          where: { username: oldUsername },
        });
        user.username = newUsername;
        await this.userRepository.save(user);
        return user;
      }
      throw { name: 'UsernameExists', message: 'Username exists' };
    } catch (err) {
      throw err;
    }
  }
}
