import { ClassProvider, Provider } from '@nestjs/common';
import { DynamicProvider } from './dynamic-provider';
import { ModuleOptionsProvider } from './types';

export class ModuleUtils {
    static resolveDynamicProvider<T>(
        provide: ClassProvider['provide'],
        optionsProvider: ModuleOptionsProvider<T>,
    ): Provider {
        if (optionsProvider instanceof DynamicProvider) {
            return {
                provide,
                useFactory: optionsProvider.useFactory,
                inject: optionsProvider.inject,
            };
        } else {
            return {
                provide,
                useValue: optionsProvider,
            };
        }
    }
}
