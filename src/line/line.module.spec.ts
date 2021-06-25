import { Client } from '@line/bot-sdk';
import { Test, TestingModule } from '@nestjs/testing';
import { LineModuleOptions } from './line-module-options.interface';
import { LineController } from './line.controller';
import { LineModule } from './line.module';

describe('LineModule', () => {
    let testModule: TestingModule;
    let lineModule: LineModule;

    const moduleOptions: LineModuleOptions = {
        channelAccessToken: 'test access token',
        channelSecret: 'test secret',
    };

    beforeEach(async () => {
        testModule = await Test.createTestingModule({
            imports: [LineModule.forRoot(moduleOptions)],
        }).compile();

        lineModule = testModule.get<LineModule>(LineModule);
    });

    it('should be defined', () => {
        expect(lineModule).toBeInstanceOf(LineModule);
    });

    it('LineController should be defined', () => {
        const controller = testModule.get<LineController>(LineController);

        expect(controller).toBeInstanceOf(LineController);
    });

    it('LINE_CHANNEL_ACCESS_TOKEN should be the same', () => {
        const channelAccessToken = testModule.get<string>(
            'LINE_CHANNEL_ACCESS_TOKEN',
        );

        expect(channelAccessToken).toBe(moduleOptions.channelAccessToken);
    });

    it('LINE_CHANNEL_SECRET should be the same', () => {
        const channelAccessToken = testModule.get<string>(
            'LINE_CHANNEL_SECRET',
        );

        expect(channelAccessToken).toBe(moduleOptions.channelSecret);
    });

    it('LINE_CLIENT should have correct config', () => {
        const client = testModule.get<Client>('LINE_CLIENT');

        expect(client).toBeInstanceOf(Client);
        expect(client.config.channelAccessToken).toBe(
            moduleOptions.channelAccessToken,
        );
        expect(client.config.channelSecret).toBe(moduleOptions.channelSecret);
    });
});
