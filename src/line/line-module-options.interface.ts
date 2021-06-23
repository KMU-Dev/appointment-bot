import { DynamicModuleOptions } from 'src/module-utils/dynamic-module-options.interface';
import { ModuleOptionsProvider } from 'src/module-utils/types';

export interface LineModuleOptions extends DynamicModuleOptions {
    channelAccessToken: ModuleOptionsProvider<string>;
    channelSecret: ModuleOptionsProvider<string>;
    useController?: boolean;
}
