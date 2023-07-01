import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

// const GLOBAL_ENDPOINT_PREFIX = 'api';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3002;
  app.use(cookieParser());
  // app.setGlobalPrefix(GLOBAL_ENDPOINT_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true, // Enable sending cookies in cross-origin requests
  });
  await app.listen(port, () => {
    console.log('Life Stats API running on port ' + port);
  });
}
bootstrap();
