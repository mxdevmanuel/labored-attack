import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { CaslAbilityFactory } from '@acl/casl-ability.factory';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Request,
  Put,
  Query,
  UseGuards,
  UseFilters,
  UnauthorizedException,
} from '@nestjs/common';
import { SnippetPostBodyDTO, SnippetPutBodyDTO } from './snippet-body.dto';
import { SnippetsService } from './snippets.service';
import { ValidatedTokenUser } from '@auth/auth.types';
import { Action } from '@auth/constants';
import { EntityNotFoundFilter } from '@database/database.filter';
import { Snippet } from '@entities/snippet.entity';
import { Request as Req } from 'express';

@Controller('snippets')
export class SnippetsController {
  constructor(
    private snippetService: SnippetsService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  logger: Logger = new Logger(SnippetsController.name);

  @Get()
  async getAllSnippets(
    @Query('take') take: number,
    @Query('skip') skip: number,
  ) {
    return this.snippetService.getAll({ take, skip });
  }

  @Get('count')
  async getSnippetCount() {
    return this.snippetService.getCount();
  }

  @UseGuards(JwtAuthGuard)
  @Get('mine')
  async getOwnSnippets(
    @Request() request: Req,
    @Query('take') take: number,
    @Query('skip') skip: number,
  ) {
    const user: any = request.user;
    return this.snippetService.getAll({
      take,
      skip,
      owner: { id: user.userId },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('mine/count')
  async getOwnSnippetCount(@Request() request: Req) {
    const user: any = request.user;
    return this.snippetService.getCount({
      owner: { id: user.userId },
    });
  }

  @UseFilters(EntityNotFoundFilter)
  @Get(':snippetId')
  async getSnippetById(@Param('snippetId') id: string) {
    return this.snippetService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createSnippet(
    @Body() { title, language, code }: SnippetPostBodyDTO,
    @Request() request: Req,
  ) {
    const user: any = request.user;
    try {
      return this.snippetService.create(code, language, user['userId'], title);
    } catch (error) {
      this.logger.error(error?.message ?? '');
      throw error;
    }
  }

  @UseFilters(EntityNotFoundFilter)
  @UseGuards(JwtAuthGuard)
  @Put(':snippetId')
  async updateSnippet(
    @Param('snippetId') id: string,
    @Body() { title, language, code }: SnippetPutBodyDTO,
    @Request() request: Req,
  ) {
    {
      try {
        const ability = this.caslAbilityFactory.createForUser(
          request.user as ValidatedTokenUser,
        );
        if (!ability.can(Action.UPDATE, Snippet)) {
          throw new UnauthorizedException();
        }
        return this.snippetService.update(id, code, language, title);
      } catch (error) {
        this.logger.error(error?.message ?? '');
        throw error;
      }
    }
  }

  @UseFilters(EntityNotFoundFilter)
  @UseGuards(JwtAuthGuard)
  @Delete(':snippetId')
  async deleteSnippet(@Param('snippetId') id: string, @Request() request: Req) {
    {
      try {
        const ability = this.caslAbilityFactory.createForUser(
          request.user as ValidatedTokenUser,
        );
        if (!ability.can(Action.DELETE, Snippet)) {
          throw new UnauthorizedException();
        }
        return this.snippetService.delete(id);
      } catch (error) {
        this.logger.error(error?.message ?? '');
        throw error;
      }
    }
  }
}
