import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration, { cf } from './config/configuration';
import { ClientsModule } from './clients/clients.module';
import { MeetingsModule } from './meetings/meetings.module';
import { ContractsModule } from './contracts/contracts.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get(cf.database.host),
        port: configService.get(cf.database.port),
        username: configService.get(cf.database.username),
        password: configService.get(cf.database.password),
        database: configService.get(cf.database.database),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get(cf.database.synchronize),
        logger: 'simple-console',
      }),
      inject: [ConfigService],
    }),
    ClientsModule,
    MeetingsModule,
    ContractsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
