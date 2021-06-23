import { FactoryProvider, Provider } from '@nestjs/common';
import { DynamicProvider } from './dynamic-provider';
import { ModuleUtils } from './module-utils';

describe('ModuleUtils', () => {
    it('should be defined', () => {
        expect(ModuleUtils).toBeDefined();
    });

    describe('resolveDynamicProvider', () => {
        it('should return value directly if provider is not DynamicProvider', () => {
            const provider: Provider = {
                provide: 'TEST',
                useValue: 'value',
            };

            expect(
                ModuleUtils.resolveDynamicProvider(
                    provider.provide,
                    provider.useValue,
                ),
            ).toStrictEqual(provider);
        });

        it('should return FactoryProvider if it provider is DynamicProvider', () => {
            const provider: FactoryProvider<string> = {
                provide: 'TEST',
                useFactory: (value: string) => {
                    return value;
                },
                inject: ['value'],
            };

            expect(
                ModuleUtils.resolveDynamicProvider(
                    provider.provide,
                    new DynamicProvider(
                        provider.useFactory,
                        provider.inject[0],
                    ),
                ),
            ).toStrictEqual(provider);
        });
    });
});
