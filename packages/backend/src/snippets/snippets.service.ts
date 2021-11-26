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
}
