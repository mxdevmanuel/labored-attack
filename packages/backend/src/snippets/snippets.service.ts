import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Snippet } from '@entities/snippet.entity';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectRepository(Snippet) private snippetRepository: Repository<Snippet>,
  ) {}

  async getAll(): Promise<Snippet[]> {
    return this.snippetRepository.find();
  }

  async findById(id: string): Promise<Snippet> {
    return this.snippetRepository.findOne({ id });
  }

  async create(
    code: string,
    language: string,
    title?: string,
  ): Promise<Snippet> {
    const snippet = this.snippetRepository.create({ title, code, language });
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
