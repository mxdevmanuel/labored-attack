import {
  IsDefined,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsIn,
} from 'class-validator';
import hljs from 'highlight.js';

const languages = hljs.listLanguages();

export class SnippetPostBodyDTO {
  @IsOptional()
  @MaxLength(50)
  title?: string;

  @IsDefined()
  @IsNotEmpty()
  code!: string;

  @IsDefined()
  @IsNotEmpty()
  @MaxLength(50)
  @IsIn(languages)
  language!: string;
}

export class SnippetPutBodyDTO {
  @IsOptional()
  @MaxLength(50)
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  code?: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(50)
  language?: string;
}
