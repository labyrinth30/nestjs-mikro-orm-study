import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { config } from 'dotenv';

config();

const mikroOrmConfig: Options = {
  driver: PostgreSqlDriver,
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: process.env.NODE_ENV === 'development',
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
};

export default mikroOrmConfig;
