import { IsDefined, IsNotEmpty, MaxLength } from 'class-validator';

export class UserPostDTO {
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(50)
  username!: string;

  @IsDefined()
  @IsNotEmpty()
  password!: string;
}
