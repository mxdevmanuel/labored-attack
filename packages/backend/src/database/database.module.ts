import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Logger } from '@nestjs/common';
import { Snippet } from '@entities/snippet.entity';

const dburl = process.env.DATABASE_URL;
Logger.log(dburl);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: dburl,
      entities: [Snippet],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
