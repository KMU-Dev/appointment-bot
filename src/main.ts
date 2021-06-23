import { NestFactory } from '@nestjs/core';
import { raw } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // disable body parser in webhook route
    app.use('/webhooks/line', raw({ type: 'application/json' }));

    await app.listen(3000);
}
bootstrap();
