import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Snippet } from '@entities/snippet.entity';
import { SnippetsController } from './snippets.controller';
import { SnippetsService } from './snippets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Snippet])],
  controllers: [SnippetsController],
  providers: [SnippetsService],
})
export class SnippetsModule {}
