import { Test, TestingModule } from '@nestjs/testing';
import { LocaltunnelService } from './localtunnel.service';

describe('NgrokService', () => {
    let service: LocaltunnelService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: 'LOCALTUNNEL_PORT',
                    useValue: 3000,
                },
                {
                    provide: 'LOCALTUNNEL_SUBDOMAIN',
                    useValue: '',
                },
                LocaltunnelService,
            ],
        }).compile();

        service = module.get<LocaltunnelService>(LocaltunnelService);
    });

    it('should be defined when LOCALTUNNEL_PORT and LOCALTUNNEL_SUBDOMAIN is provided', () => {
        expect(service).toBeDefined();
    });
});
