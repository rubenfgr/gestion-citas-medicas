import { cf } from './config/configuration';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>(cf.port);

  await app.listen(3000, () => {
    console.log(`*** Nest Living on port ${port} ***`);
  });
}
bootstrap();
