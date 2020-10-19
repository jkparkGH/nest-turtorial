import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // decorator 선언한 것 만 validator에 도달한다
      forbidNonWhitelisted: true, // decorator 선언하지 않은 요소가 존재하는 경우, reject
      transform: true, // 자동으로 값의 type 을 변환시켜줌
    }),
  );
  await app.listen(3000);
}
bootstrap();
