import { Controller, Get } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core'; // 또는 @mikro-orm/postgresql

@Controller('health')
export class HealthController {
    constructor(private readonly em: EntityManager) { }

    @Get()
    async checkHealth() {
        try {
            await this.em.getConnection().execute('SELECT 1');

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
