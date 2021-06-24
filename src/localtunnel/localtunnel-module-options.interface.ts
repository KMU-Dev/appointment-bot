import { ModuleOptionsProvider } from '../module-utils/types';
import { DynamicModuleOptions } from '../module-utils/dynamic-module-options.interface';

export interface LocaltunnelModuleOptions extends DynamicModuleOptions {
    port: ModuleOptionsProvider<number>;
    subdomain?: ModuleOptionsProvider<string>;
}
