// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';

import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  schema: './src/database/schema.ts',
  out: './drizzle', // 마이그레이션 SQL 파일이 저장될 폴더
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
