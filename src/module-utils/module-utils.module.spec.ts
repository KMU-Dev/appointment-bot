import { Test, TestingModule } from '@nestjs/testing';
import { ModuleUtilsModule } from './module-utils.module';

describe('ModuleUtilsModule', () => {
    let module: ModuleUtilsModule;

    beforeEach(async () => {
        const testingModule: TestingModule = await Test.createTestingModule({
            imports: [ModuleUtilsModule],
        }).compile();

        module = testingModule.get(ModuleUtilsModule);
    });

    it('should be instance of ModuleUtilsModule', () => {
        expect(module).toBeInstanceOf(ModuleUtilsModule);
    });
});
