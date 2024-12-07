import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Agregar ValidationPipe global
  app.useGlobalPipes(new ValidationPipe());
  
  // Mantener la configuración CORS
  app.enableCors();
  await app.listen(3000);  
}
bootstrap();
