import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const FRONTEND_URL = process.env.FRONTEND_URL;

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (FRONTEND_URL && origin === FRONTEND_URL) {
        return callback(null, true);
      }
      return callback(new Error('CORS policy violation'), false);
    },
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: false
  });
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || undefined;
  await app.listen(port, host);
}

void bootstrap();
