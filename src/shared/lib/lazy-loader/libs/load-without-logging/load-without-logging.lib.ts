import type { ComponentType } from 'react';

import type * as Types from '../../lazy-loader.types';
import { getComponentModule } from '../get-component-module';

export const loadWithoutLogging = async <TProps = Types.DefaultProps>(
    importFn: () => Promise<Types.ImportedModule<TProps>>,
    componentName: string,
): Promise<{ default: ComponentType<TProps> }> => {
    const module = await importFn();
    return getComponentModule(module, componentName);
};
