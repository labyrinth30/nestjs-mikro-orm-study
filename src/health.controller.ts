import { Controller, Get, Inject } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { DRIZZLE } from './database/database.module';

@Controller('health')
export class HealthController {
  constructor(@Inject(DRIZZLE) private readonly db: any) { }

  @Get()
  async checkHealth() {
    try {
      await this.db.execute(sql`SELECT 1`);

      return {
        status: 'OK',
        message: 'Neon DB 연결 성공!',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('DB Connection Error:', error);
      return {
        status: 'Error',
        message: 'Neon DB 연결 실패',
        error: error.message,
      };
    }
  }
}
