import { Client, middleware } from '@line/bot-sdk';
import { Middleware } from '@line/bot-sdk/dist/middleware';
import {
    DynamicModule,
    Inject,
    MiddlewareConsumer,
    Module,
    NestModule,
    Provider,
} from '@nestjs/common';
import { ModuleUtils } from 'src/module-utils/module-utils';
import { LineModuleOptions } from './line-module-options.interface';
import { LineController } from './line.controller';

@Module({})
export class LineModule implements NestModule {
    constructor(
        @Inject('LINE_MIDDLEWARE') private readonly middleware: Middleware,
    ) {}

    static forRoot(options: LineModuleOptions): DynamicModule {
        // check if controller is needed
        const controllers = [];
        if (options.useController ?? true === true) {
            controllers.push(LineController);
        }

        return {
            module: LineModule,
            controllers,
            providers: [
                ModuleUtils.resolveDynamicProvider(
                    'LINE_CHANNEL_ACCESS_TOKEN',
                    options.channelAccessToken,
                ),
                ModuleUtils.resolveDynamicProvider(
                    'LINE_CHANNEL_SECRET',
                    options.channelSecret,
                ),
                this.getLineMiddleware(
                    'LINE_CHANNEL_ACCESS_TOKEN',
                    'LINE_CHANNEL_SECRET',
                ),
                this.getLineClient(
                    'LINE_CHANNEL_ACCESS_TOKEN',
                    'LINE_CHANNEL_SECRET',
                ),
            ],
        };
    }

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(this.middleware).forRoutes(LineController);
    }

    private static getLineMiddleware(
        accessTokenKey: string,
        channelSecretKey: string,
    ): Provider {
        return {
            provide: 'LINE_MIDDLEWARE',
            useFactory: (channelAccessToken: string, channelSecret: string) =>
                middleware({
                    channelAccessToken,
                    channelSecret,
                }),
            inject: [accessTokenKey, channelSecretKey],
        };
    }

    private static getLineClient(
        accessTokenKey: string,
        channelSecretKey: string,
    ): Provider {
        return {
            provide: 'LINE_MIDDLEWARE',
            useFactory: (channelAccessToken: string, channelSecret: string) =>
                new Client({
                    channelAccessToken,
                    channelSecret,
                }),
            inject: [accessTokenKey, channelSecretKey],
        };
    }
}
