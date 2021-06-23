import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './config/configuration';
import { LineModule } from './line/line.module';
import { DynamicProvider } from './module-utils/dynamic-provider';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: true,
            ignoreEnvVars: true,
            load: [configuration],
        }),
        LineModule.forRoot({
            channelAccessToken: new DynamicProvider(
                (configService: ConfigService) =>
                    configService.get<string>('channels.line.accessToken'),
                ConfigService,
            ),
            channelSecret: new DynamicProvider(
                (configService: ConfigService) =>
                    configService.get<string>('channels.line.channelSecret'),
                ConfigService,
            ),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
