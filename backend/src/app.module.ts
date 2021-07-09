import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { ClientsModule } from './app/clients/clients.module';
import { ContractsModule } from './app/contracts/contracts.module';
import { MeetingsModule } from './app/meetings/meetings.module';
import { UsersModule } from './app/users/users.module';
import configuration, { cf } from './config/configuration';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: ['.env'],
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
        migrationsTableName: 'migrations',
        migrations: ['migration/*.{.ts,.js}'],
        cli: {
          migrationsDir: 'migration',
        },
        synchronize: configService.get(cf.database.synchronize),
        logger: 'simple-console',
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    MeetingsModule,
    UsersModule,
    AuthModule,
    ContractsModule,
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /* {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }, */
  ],
})
export class AppModule {}
