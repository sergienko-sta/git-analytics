import type { ComponentType } from 'react';

import * as Constants from '../../constants';
import type * as Types from '../../lazy-loader.types';
import { getComponentModule } from '../get-component-module';

export const loadWithLogging = async <TProps = Types.DefaultProps>(
    importFn: () => Promise<Types.ImportedModule<TProps>>,
    componentName: string,
): Promise<{ default: ComponentType<TProps> }> => {
    try {
        const module = await importFn();
        console.warn(Constants.logMessages.start(componentName));
        const startTime = performance.now();
        const loadTime = (performance.now() - startTime).toFixed(2);

        console.warn(Constants.logMessages.success(componentName, loadTime));
        console.warn(Constants.logMessages.exports(componentName), Object.keys(module));

        return getComponentModule<TProps>(module, componentName);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error(Constants.logMessages.error(componentName), errorMessage);
        throw error instanceof Error ? error : new Error(String(error));
    }
};
