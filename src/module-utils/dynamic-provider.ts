import { FactoryProvider } from '@nestjs/common';

export class DynamicProvider<T> {
    readonly useFactory: FactoryProvider<T>['useFactory'];
    readonly inject: FactoryProvider<T>['inject'];

    constructor(
        useFactory: FactoryProvider<T>['useFactory'],
        ...inject: FactoryProvider<T>['inject']
    ) {
        this.useFactory = useFactory;
        this.inject = inject;
    }
}
