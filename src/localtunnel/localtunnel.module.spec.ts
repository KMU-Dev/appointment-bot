import { Test, TestingModule } from '@nestjs/testing';
import { LocaltunnelModule } from './localtunnel.module';
import { LocaltunnelService } from './localtunnel.service';

describe('LocaltunnelModule', () => {
    let localtunnelModule: LocaltunnelModule;
    let localtunnelService: LocaltunnelService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                LocaltunnelModule.forRoot({
                    port: 3000,
                }),
            ],
        }).compile();

        localtunnelModule = module.get(LocaltunnelModule);
        localtunnelService = module.get(LocaltunnelService);
    });

    it('should be defined', () => {
        expect(localtunnelModule).toBeInstanceOf(LocaltunnelModule);
    });

    it('LocaltunnelService should be defined', () => {
        expect(localtunnelService).toBeInstanceOf(LocaltunnelService);
    });
});
