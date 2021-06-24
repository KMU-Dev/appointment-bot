import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { raw } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // get config service
    const configService = app.get(ConfigService);

    // disable body parser in webhook route
    const lineEnabled = configService.get<boolean>('channels.line.enabled');
    if (lineEnabled) {
        const lineWebhook = configService.get<string>('channels.line.path');
        app.use(lineWebhook, raw({ type: 'application/json' }));
    }

    await app.listen(configService.get('port'));
}
bootstrap();
