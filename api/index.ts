import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

let app;

export default async function handler(req, res) {
    if (!app) {
        app = await NestFactory.create(AppModule);
        // Vercel 환경에서는 prefix를 /api로 설정하는 경우가 많음 (선택사항)
        app.setGlobalPrefix('api');
        await app.init();
    }

    const expressApp = app.getHttpAdapter().getInstance();
    return expressApp(req, res);
}
