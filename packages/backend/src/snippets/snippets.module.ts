import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Snippet } from '@entities/snippet.entity';
import { SnippetsController } from './snippets.controller';
import { SnippetsService } from './snippets.service';
import { CaslAbilityFactory } from '@acl/casl-ability.factory';
import { User } from '@entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Snippet, User])],
  controllers: [SnippetsController],
  providers: [SnippetsService, CaslAbilityFactory],
})
export class SnippetsModule {}
