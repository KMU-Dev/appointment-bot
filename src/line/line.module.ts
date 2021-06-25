import { Client, middleware } from '@line/bot-sdk';
import {
    DynamicModule,
    Inject,
    MiddlewareConsumer,
    Module,
    NestModule,
    Provider,
} from '@nestjs/common';
import { ModuleUtils } from '../module-utils/module-utils';
import { LineModuleOptions } from './line-module-options.interface';
import { LineController } from './line.controller';

@Module({})
export class LineModule implements NestModule {
    constructor(
        @Inject('LINE_CHANNEL_ACCESS_TOKEN')
        private readonly channelAccessToken: string,
        @Inject('LINE_CHANNEL_SECRET')
        private readonly channelSecret: string,
    ) {}

    static forRoot(options: LineModuleOptions): DynamicModule {
        // check if controller is needed
        const controllers = [];
        if (options.useController ?? true === true) {
            controllers.push(LineController);
        }

        return {
            module: LineModule,
            imports: options.imports,
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
                this.getLineClient(
                    'LINE_CHANNEL_ACCESS_TOKEN',
                    'LINE_CHANNEL_SECRET',
                ),
            ],
        };
    }

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                middleware({
                    channelAccessToken: this.channelAccessToken,
                    channelSecret: this.channelSecret,
                }),
            )
            .forRoutes(LineController);
    }

    private static getLineClient(
        accessTokenKey: string,
        channelSecretKey: string,
    ): Provider {
        return {
            provide: 'LINE_CLIENT',
            useFactory: (channelAccessToken: string, channelSecret: string) =>
                new Client({
                    channelAccessToken,
                    channelSecret,
                }),
            inject: [accessTokenKey, channelSecretKey],
        };
    }
}
