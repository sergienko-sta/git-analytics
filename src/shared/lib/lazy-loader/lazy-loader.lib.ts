import { type ComponentType, lazy, type LazyExoticComponent } from 'react';

import type * as Types from './lazy-loader.types';
import * as Libs from './libs';

export const lazyLoad = <TProps extends Record<string, unknown> = Types.DefaultProps>(
    importFn: () => Promise<Types.ImportedModule<TProps>>,
    options: Types.LazyLoadOptions,
): LazyExoticComponent<ComponentType<TProps>> => {
    const { componentName, enabled = true } = options;

    const loadModule = enabled
        ? () => Libs.loadWithLogging(importFn, componentName)
        : () => Libs.loadWithoutLogging(importFn, componentName);

    return lazy(loadModule);
};
