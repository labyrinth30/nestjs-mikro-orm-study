import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { config } from 'dotenv';

config();

const mikroOrmConfig: Options = {
  driver: PostgreSqlDriver,
  // 기존 개별 설정 대신 clientUrl 사용
  clientUrl: process.env.POSTGRES_URL,

  // Vercel(Neon) DB 연결을 위한 SSL 설정 (필수)
  driverOptions: {
    connection: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },

  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  debug: process.env.NODE_ENV === 'development',
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
};

export default mikroOrmConfig;