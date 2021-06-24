import { DynamicModule, Module } from '@nestjs/common';
import { ModuleUtils } from '../module-utils/module-utils';
import { LocaltunnelModuleOptions } from './localtunnel-module-options.interface';
import { LocaltunnelService } from './localtunnel.service';

@Module({
    providers: [LocaltunnelService],
})
export class LocaltunnelModule {
    static forRoot(options: LocaltunnelModuleOptions): DynamicModule {
        return {
            module: LocaltunnelModule,
            imports: options.imports,
            providers: [
                ModuleUtils.resolveDynamicProvider(
                    'LOCALTUNNEL_PORT',
                    options.port,
                ),
                ModuleUtils.resolveDynamicProvider(
                    'LOCALTUNNEL_SUBDOMAIN',
                    options.subdomain ?? '',
                ),
            ],
        };
    }
}
