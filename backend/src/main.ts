import { cf } from './config/configuration';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get(cf.port);

  console.log(new Date().toLocaleString());

  await app.listen(port, () => {
    console.log(`*** Nest living on port ${port}`);
  });
}
bootstrap();
