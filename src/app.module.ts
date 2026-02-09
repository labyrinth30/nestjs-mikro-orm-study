import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
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

        // ConfigService를 통해 환경변수 주입 (개별 설정 제거 -> clientUrl 사용)
        clientUrl: configService.get<string>('POSTGRES_URL'),

        // 혹시 config 파일에서 누락되었을 경우를 대비해 SSL 설정 재확인
        driverOptions: {
          connection: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
        },

        autoLoadEntities: true, // forFeature로 등록된 엔티티 자동 로드
      }),
    }),
    MikroOrmModule.forFeature([TestEntity]),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule { }
