import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

export const DRIZZLE = Symbol('DRIZZLE');

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        if (!databaseUrl) {
          throw new Error('DATABASE_URL is not defined in the environment variables');
        }

        // Use Neon's serverless HTTP driver
        const sql = neon(databaseUrl);

        // Wrap with Drizzle ORM HTTP driver
        const db = drizzle(sql, { schema });

        return db;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule { }
