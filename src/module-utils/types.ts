import { DynamicProvider } from './dynamic-provider';

export type ModuleOptionsProvider<T> =
    | T
    | DynamicProvider<T>
    | DynamicProvider<Promise<T>>;
