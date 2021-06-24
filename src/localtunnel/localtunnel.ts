import {
    Inject,
    Injectable,
    Logger,
    OnApplicationBootstrap,
} from '@nestjs/common';
import * as localtunnel from 'localtunnel';

@Injectable()
export class LocaltunnelService implements OnApplicationBootstrap {
    private readonly logger = new Logger(LocaltunnelService.name);

    constructor(
        @Inject('LOCALTUNNEL_PORT') private readonly port: number,
        @Inject('LOCALTUNNEL_SUBDOMAIN') private readonly subdomain: string,
    ) {}

    async onApplicationBootstrap() {
        if (process.env.NODE_ENV === 'development') {
            const tunnel = await localtunnel({
                port: this.port,
                subdomain: this.subdomain,
            });
            this.logger.log(`Application is now served at ${tunnel.url}`);
        }
    }
}
