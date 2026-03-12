import type { ComponentType } from 'react';

export interface LazyLoadOptions {
    componentName: string;
    enabled?: boolean;
}

export type DefaultProps = Record<string, unknown>;

export interface ModuleWithDefault<TProps = DefaultProps> {
    default: ComponentType<TProps>;
}

export interface ModuleWithNamed<TProps = DefaultProps> {
    [key: string]: ComponentType<TProps> | undefined;
}

export type ImportedModule<TProps = DefaultProps> =
    | ModuleWithDefault<TProps>
    | ModuleWithNamed<TProps>;

export const hasDefaultExport = <TProps = DefaultProps>(
    module: ImportedModule<TProps>,
): module is ModuleWithDefault<TProps> => {
    return 'default' in module && typeof module.default === 'function';
};

export const hasNamedExport = <TProps = DefaultProps>(
    module: ImportedModule<TProps>,
    name: string,
): module is ModuleWithNamed<TProps> => {
    return name in module && typeof (module as ModuleWithNamed<TProps>)[name] === 'function';
};
