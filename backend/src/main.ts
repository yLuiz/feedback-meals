import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const corsOrigins = ["http://localhost:3002", "http://147.1.5.47:3002"];
// const corsOrigins = ["http://147.1.0.84", "http://147.1.40.158", "http://147.1.0.85"];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { 
    cors: true
  });

  app.enableCors({
    origin: corsOrigins,
  });

  await app.listen(3000);
}
bootstrap();
