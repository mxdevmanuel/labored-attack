import { Controller, Get } from '@nestjs/common';
import { SnippetsService } from './snippets.service';

@Controller('snippets')
export class SnippetsController {
  constructor(private snippetService: SnippetsService) {}

  @Get()
  async getAllSnippets() {
    return this.snippetService.getAll();
  }
}
