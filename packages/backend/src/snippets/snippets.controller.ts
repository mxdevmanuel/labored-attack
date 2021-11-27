import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { SnippetPostBodyDTO, SnippetPutBodyDTO } from './snippet-body.dto';

@Controller('snippets')
export class SnippetsController {
  constructor(private snippetService: SnippetsService) {}

  logger: Logger = new Logger(SnippetsController.name);

  @Get()
  async getAllSnippets() {
    return this.snippetService.getAll();
  }

  @Get(':snippetId')
  async getSnippetById(@Param('snippetId') id: string) {
    return this.snippetService.findById(id);
  }

  @Post()
  async createSnippet(@Body() { title, language, code }: SnippetPostBodyDTO) {
    try {
      return this.snippetService.create(code, language, title);
    } catch (error) {
      this.logger.error(error?.message ?? '');
      throw error;
    }
  }

  @Put(':snippetId')
  async updateSnippet(
    @Param('snippetId') id: string,
    @Body() { title, language, code }: SnippetPutBodyDTO,
  ) {
    {
      try {
        return this.snippetService.update(id, code, language, title);
      } catch (error) {
        this.logger.error(error?.message ?? '');
        throw error;
      }
    }
  }

  @Delete(':snippetId')
  async deleteSnippet(@Param('snippetId') id: string) {
    {
      try {
        return this.snippetService.delete(id);
      } catch (error) {
        this.logger.error(error?.message ?? '');
        throw error;
      }
    }
  }
}
