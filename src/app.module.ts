import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import mikroOrmConfig from '../mikro-orm.config';

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
        dbName: configService.get<string>('DB_NAME'),
        user: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        autoLoadEntities: true, // forFeature로 등록된 엔티티 자동 로드
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
