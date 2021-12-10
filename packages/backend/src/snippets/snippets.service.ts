import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Snippet } from '@entities/snippet.entity';
import { User } from '@entities/user.entity';
import { Pagination } from '@database/database.dto';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectRepository(Snippet) private snippetRepository: Repository<Snippet>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAll(options?: Pagination): Promise<Snippet[]> {
    return this.snippetRepository.find({ ...options, relations: ['owner'] });
  }

  async findById(id: string): Promise<Snippet> {
    return this.snippetRepository.findOneOrFail(
      { id },
      { relations: ['owner'] },
    );
  }

  async create(
    code: string,
    language: string,
    userId: string,
    title?: string,
  ): Promise<Snippet> {
    const snippet = this.snippetRepository.create({
      title,
      code,
      language,
    });
    snippet.owner = await this.userRepository.findOne(userId);
    return await this.snippetRepository.save(snippet);
  }

  async update(id: string, code?: string, language?: string, title?: string) {
    const snippet = await this.snippetRepository.preload({
      id,
      code,
      language,
      title,
    });
    return await this.snippetRepository.save(snippet);
  }

  async delete(id: string): Promise<string> {
    await this.snippetRepository.delete(id);
    return `Snippet ${id} deleted.`;
  }
}
