import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
    let service: AppService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppService],
        }).compile();

        service = module.get(AppService);
    });

    describe('getHello', () => {
        it('should return Hello World!', () => {
            expect(service.getHello()).toBe('Hello World!');
        });
    });
});
