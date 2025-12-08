import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: [
      'https://hardcodeando.com',
      'http://hardcodeando.com',
      'https://www.hardcodeando.com',
      'http://www.hardcodeando.com',
      'https://bugzilo.com',
      'http://bugzilo.com',
      'https://www.bugzilo.com',
      'http://www.bugzilo.com',
    ],
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
