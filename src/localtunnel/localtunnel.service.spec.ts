import { Test, TestingModule } from '@nestjs/testing';
import { LocaltunnelService } from './localtunnel';

describe('NgrokService', () => {
    let service: LocaltunnelService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LocaltunnelService],
        }).compile();

        service = module.get<LocaltunnelService>(LocaltunnelService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
