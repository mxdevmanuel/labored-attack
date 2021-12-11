import { Pagination, SnippetWhere } from '@database/database.dto';
import { Snippet } from '@entities/snippet.entity';
import { User } from '@entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { Repository } from 'typeorm';
import { addCondition, addPagination } from '@database/database.utils';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectRepository(Snippet) private snippetRepository: Repository<Snippet>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAll(options?: Pagination & SnippetWhere): Promise<Snippet[]> {
    let qb = this.snippetRepository.createQueryBuilder('snippet');

    const { owner, ...rest } = options;

    qb = qb.leftJoin('snippet.owner', 'owner').addSelect('owner.username');

    if (!(_.isNil(owner) || _.isEmpty(owner))) {
      qb = addCondition<Snippet>(qb, 'snippet."ownerId" = :id', owner);
    }

    qb = addPagination(qb, rest);

    return qb.getMany();
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
