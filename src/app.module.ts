import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './config/configuration';
import { LineModule } from './line/line.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: true,
            ignoreEnvVars: true,
            load: [configuration],
        }),
        LineModule.forRoot({
            channelAccessTokenKey: 'channels.line.accessToken',
            channelSecretKey: 'channels.line.channelSecret',
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
