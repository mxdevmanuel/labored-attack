import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Snippet } from '@entities/snippet.entity';
import { User } from '@entities/user.entity';

const dburl = process.env.DATABASE_URL;
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: dburl,
      entities: [Snippet, User],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
