import { defineConfig } from '@mikro-orm/postgresql'; // 핵심 변경 사항
import { config } from 'dotenv';

config();

export default defineConfig({

  clientUrl: process.env.POSTGRES_URL,

  // Vercel(Neon) DB 연결을 위한 SSL 설정
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
});
