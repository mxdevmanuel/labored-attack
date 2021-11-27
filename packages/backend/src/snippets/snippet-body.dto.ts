import { IsDefined, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import * as _ from 'lodash';

export class SnippetPostBodyDTO {
  @MaxLength(50)
  title?: string;

  @IsDefined()
  @IsNotEmpty()
  code!: string;

  @IsDefined()
  @IsNotEmpty()
  @MaxLength(50)
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
