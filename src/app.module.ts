import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import mikroOrmConfig from '../mikro-orm.config';
import { TestEntity } from './test.entity';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...mikroOrmConfig,

        entities: undefined,
        entitiesTs: undefined,

        clientUrl: configService.get<string>('POSTGRES_URL'),

        driverOptions: {
          connection: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
        },

        autoLoadEntities: true,
      } as MikroOrmModuleOptions),
    }),

    MikroOrmModule.forFeature([TestEntity]),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule { }
