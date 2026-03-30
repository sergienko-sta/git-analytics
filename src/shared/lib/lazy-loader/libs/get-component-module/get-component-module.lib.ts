import type { ComponentType } from 'react';

import * as Types from '../../lazy-loader.types';

export const getComponentModule = <TProps = Types.DefaultProps>(
    module: Types.ImportedModule<TProps>,
    componentName: string,
): { default: ComponentType<TProps> } => {
    if (Types.hasDefaultExport(module)) {
        return { default: module.default };
    }

    if (Types.hasNamedExport(module, componentName)) {
        const namedModule = module;
        const namedExport = namedModule[componentName];

        if (namedExport) {
            return { default: namedExport };
        }
    }

    const availableExports = Object.keys(module).join(', ');
    throw new Error(
        `Component "${componentName}" not found in module. ` +
            `Available exports: ${availableExports || 'none'}`,
    );
};
