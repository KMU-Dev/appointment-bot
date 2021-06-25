import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { LineModule } from './line/line.module';
import { LocaltunnelModule } from './localtunnel/localtunnel.module';

describe('AppModule', () => {
    let testingModule: TestingModule;
    let module: AppModule;

    beforeAll(async () => {
        testingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        module = testingModule.get(AppModule);
    });

    it('should be instance of AppModule', () => {
        expect(module).toBeInstanceOf(AppModule);
    });

    it('should have all imported modules, controllers and providers', () => {
        expect(testingModule.get(ConfigModule)).toBeInstanceOf(ConfigModule);
        expect(testingModule.get(LineModule)).toBeInstanceOf(LineModule);
        expect(testingModule.get(LocaltunnelModule)).toBeInstanceOf(
            LocaltunnelModule,
        );
        expect(testingModule.get(AppController)).toBeInstanceOf(AppController);
        expect(testingModule.get(AppService)).toBeInstanceOf(AppService);
    });
});
