import { ModuleMetadata } from '@nestjs/common';

export interface DynamicModuleOptions {
    imports?: ModuleMetadata['imports'];
}
