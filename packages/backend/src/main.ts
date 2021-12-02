import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { cookieConstants } from '@auth/constants';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [/http:\/\/localhost:[0-9]{4}/],
    credentials: true,
  });
  app.use(cookieParser(cookieConstants.secret));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
