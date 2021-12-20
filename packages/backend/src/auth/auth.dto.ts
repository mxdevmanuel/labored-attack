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

export class UsernamePutDTO {
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(50)
  username!: string;
}

export class PasswordPutDTO {
  @IsDefined()
  @IsNotEmpty()
  oldPassword!: string;

  @IsDefined()
  @IsNotEmpty()
  password!: string;
}
