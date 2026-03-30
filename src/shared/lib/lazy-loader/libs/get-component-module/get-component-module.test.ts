import type { ComponentType } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
    type DefaultProps,
    hasDefaultExport,
    hasNamedExport,
    type ImportedModule,
} from '../../lazy-loader.types';

import { getComponentModule } from './get-component-module.lib';

vi.mock('../../lazy-loader.types', () => ({
    hasDefaultExport: vi.fn(),
    hasNamedExport: vi.fn(),
}));

describe('getComponentModule', () => {
    const MockComponent: ComponentType<DefaultProps> = () => null;
    MockComponent.displayName = 'MockComponent';

    const AnotherComponent: ComponentType<DefaultProps> = () => null;
    AnotherComponent.displayName = 'AnotherComponent';

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('when module has default export', () => {
        it('should return default export when hasDefaultExport returns true', () => {
            const mockModule: ImportedModule = {
                default: MockComponent,
                another: AnotherComponent,
            };

            vi.mocked(hasDefaultExport).mockReturnValue(true);

            const result = getComponentModule(mockModule, 'AnotherComponent');

            expect(result).toEqual({ default: MockComponent });
            expect(hasDefaultExport).toHaveBeenCalledWith(mockModule);
            expect(hasNamedExport).not.toHaveBeenCalled();
        });

        it('should ignore named export even if it exists', () => {
            const mockModule: ImportedModule = {
                default: MockComponent,
                TestComponent: AnotherComponent,
            };

            vi.mocked(hasDefaultExport).mockReturnValue(true);

            const result = getComponentModule(mockModule, 'TestComponent');

            expect(result).toEqual({ default: MockComponent });
            expect(hasDefaultExport).toHaveBeenCalledWith(mockModule);
            expect(hasNamedExport).not.toHaveBeenCalled();
        });
    });

    describe('when module has named export', () => {
        it('should return named export when component name matches', () => {
            const mockModule: ImportedModule = {
                TestComponent: MockComponent,
                AnotherComponent: AnotherComponent,
            };

            vi.mocked(hasDefaultExport).mockReturnValue(false);
            vi.mocked(hasNamedExport).mockReturnValue(true);

            const result = getComponentModule(mockModule, 'TestComponent');

            expect(result).toEqual({ default: MockComponent });
            expect(hasDefaultExport).toHaveBeenCalledWith(mockModule);
            expect(hasNamedExport).toHaveBeenCalledWith(
                mockModule,
                'TestComponent',
            );
        });

        it('should return different named export for different component name', () => {
            const mockModule: ImportedModule = {
                TestComponent: MockComponent,
                AnotherComponent: AnotherComponent,
            };

            vi.mocked(hasDefaultExport).mockReturnValue(false);
            vi.mocked(hasNamedExport).mockReturnValue(true);

            const result = getComponentModule(mockModule, 'AnotherComponent');

            expect(result).toEqual({ default: AnotherComponent });
        });

        it('should throw error when named export exists but component name does not match', () => {
            const mockModule: ImportedModule = {
                TestComponent: MockComponent,
            };

            vi.mocked(hasDefaultExport).mockReturnValue(false);
            vi.mocked(hasNamedExport).mockReturnValue(false);

            expect(() =>
                getComponentModule(mockModule, 'NonExistentComponent'),
            ).toThrow(
                'Component "NonExistentComponent" not found in module. Available exports: TestComponent',
            );
        });

        it('should throw error when hasNamedExport returns true but export is undefined', () => {
            const mockModule: ImportedModule = {
                TestComponent: undefined,
            };

            vi.mocked(hasDefaultExport).mockReturnValue(false);
            vi.mocked(hasNamedExport).mockReturnValue(true);

            expect(() =>
                getComponentModule(mockModule, 'TestComponent'),
            ).toThrow(
                'Component "TestComponent" not found in module. Available exports: TestComponent',
            );
        });
    });

    describe('when module has no matching exports', () => {
        it('should throw error with list of available exports', () => {
            const mockModule: ImportedModule = {
                SomeOtherExport: MockComponent,
                AnotherExport: AnotherComponent,
            };

            vi.mocked(hasDefaultExport).mockReturnValue(false);
            vi.mocked(hasNamedExport).mockReturnValue(false);

            expect(() =>
                getComponentModule(mockModule, 'TestComponent'),
            ).toThrow(
                'Component "TestComponent" not found in module. Available exports: SomeOtherExport, AnotherExport',
            );
        });

        it('should handle empty module', () => {
            const mockModule: ImportedModule = {};

            vi.mocked(hasDefaultExport).mockReturnValue(false);
            vi.mocked(hasNamedExport).mockReturnValue(false);

            expect(() =>
                getComponentModule(mockModule, 'TestComponent'),
            ).toThrow(
                'Component "TestComponent" not found in module. Available exports: none',
            );
        });
    });

    describe('edge cases', () => {
        it('should handle module with both default and named exports', () => {
            const mockModule: ImportedModule = {
                default: MockComponent,
                TestComponent: AnotherComponent,
            };

            vi.mocked(hasDefaultExport).mockReturnValue(true);

            const result = getComponentModule(mockModule, 'TestComponent');

            expect(result).toEqual({ default: MockComponent });
        });

        it('should handle case-sensitive component names', () => {
            const mockModule: ImportedModule = {
                testcomponent: MockComponent,
                TestComponent: AnotherComponent,
            };

            vi.mocked(hasDefaultExport).mockReturnValue(false);
            vi.mocked(hasNamedExport).mockImplementation(
                (_, name) => name === 'TestComponent',
            );

            const result = getComponentModule(mockModule, 'TestComponent');
            expect(result).toEqual({ default: AnotherComponent });

            expect(() =>
                getComponentModule(mockModule, 'testcomponent'),
            ).toThrow();
        });

        it('should work with generic TProps type', () => {
            interface CustomProps {
                title: string;
                count: number;
            }

            const CustomComponent: ComponentType<CustomProps> = () => null;

            const mockModule: ImportedModule<CustomProps> = {
                CustomComponent,
            };

            vi.mocked(hasDefaultExport).mockReturnValue(false);
            vi.mocked(hasNamedExport).mockReturnValue(true);

            const result = getComponentModule<CustomProps>(
                mockModule,
                'CustomComponent',
            );

            expect(result).toEqual({ default: CustomComponent });
        });
    });

    describe('integration with guards', () => {
        it('should call guards in correct order', () => {
            const mockModule: ImportedModule = {
                TestComponent: MockComponent,
            };

            getComponentModule(mockModule, 'TestComponent');

            expect(hasDefaultExport).toHaveBeenCalledTimes(1);
            expect(hasDefaultExport).toHaveBeenCalledWith(mockModule);
            expect(hasNamedExport).toHaveBeenCalledTimes(1);
            expect(hasNamedExport).toHaveBeenCalledWith(
                mockModule,
                'TestComponent',
            );
        });

        it('should not call hasNamedExport if hasDefaultExport returns true', () => {
            const mockModule: ImportedModule = {
                default: MockComponent,
            };

            vi.mocked(hasDefaultExport).mockReturnValue(true);

            getComponentModule(mockModule, 'TestComponent');

            expect(hasDefaultExport).toHaveBeenCalledTimes(1);
            expect(hasNamedExport).not.toHaveBeenCalled();
        });
    });
});
