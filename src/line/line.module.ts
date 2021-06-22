import { Client, middleware } from '@line/bot-sdk';
import { Middleware } from '@line/bot-sdk/dist/middleware';
import {
    DynamicModule,
    Inject,
    MiddlewareConsumer,
    Module,
    NestModule,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
                {
                    provide: 'LINE_MIDDLEWARE',
                    useFactory: (configService: ConfigService) => {
                        return middleware(
                            this.getLineConfig(
                                configService,
                                options.channelAccessTokenKey,
                                options.channelSecretKey,
                            ),
                        );
                    },
                    inject: [ConfigService],
                },
                {
                    provide: 'LINE_CLIENT',
                    useFactory: (configService: ConfigService) => {
                        return new Client(
                            this.getLineConfig(
                                configService,
                                options.channelAccessTokenKey,
                                options.channelSecretKey,
                            ),
                        );
                    },
                    inject: [ConfigService],
                },
            ],
        };
    }

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(this.middleware).forRoutes(LineController);
    }

    private static getLineConfig(
        configService: ConfigService,
        channelAccessTokenKey: string,
        channelSecretKey: string,
    ) {
        return {
            channelAccessToken: configService.get<string>(
                channelAccessTokenKey,
            ),
            channelSecret: configService.get<string>(channelSecretKey),
        };
    }
}
