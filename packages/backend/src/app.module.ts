import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SnippetsModule } from './snippets/snippets.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AclModule } from './acl/acl.module';

@Module({
  imports: [DatabaseModule, SnippetsModule, AuthModule, UsersModule, AclModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
