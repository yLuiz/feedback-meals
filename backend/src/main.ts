import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { 
    cors: true
  });

  app.enableCors({
    origin: ["http://147.1.0.84", "http://147.1.40.158", "http://147.1.0.85"]
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
