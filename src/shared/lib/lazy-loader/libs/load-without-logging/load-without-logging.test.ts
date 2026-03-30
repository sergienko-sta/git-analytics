import type { ComponentType } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type * as Types from '../../lazy-loader.types';
import { getComponentModule } from '../get-component-module';

import { loadWithoutLogging } from './load-without-logging.lib';

vi.mock('../get-component-module', () => ({
    getComponentModule: vi.fn(),
}));

describe('loadWithoutLogging', () => {
    const mockComponentName = 'TestComponent';
    const mockComponent: ComponentType<any> = () => null;
    const mockModule: Types.ImportedModule = {
        default: mockComponent,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('successful loading', () => {
        it('should load module and return component', async () => {
            const mockImportFn = vi.fn().mockResolvedValue(mockModule);
            vi.mocked(getComponentModule).mockReturnValue({
                default: mockComponent,
            });

            const result = await loadWithoutLogging(
                mockImportFn,
                mockComponentName,
            );

            expect(result).toEqual({ default: mockComponent });
            expect(mockImportFn).toHaveBeenCalledTimes(1);
            expect(mockImportFn).toHaveBeenCalledWith();
            expect(getComponentModule).toHaveBeenCalledTimes(1);
            expect(getComponentModule).toHaveBeenCalledWith(
                mockModule,
                mockComponentName,
            );
        });

        it('should work with default export', async () => {
            const moduleWithDefault: Types.ImportedModule = {
                default: mockComponent,
            };
            const mockImportFn = vi.fn().mockResolvedValue(moduleWithDefault);
            vi.mocked(getComponentModule).mockReturnValue({
                default: mockComponent,
            });

            const result = await loadWithoutLogging(
                mockImportFn,
                mockComponentName,
            );

            expect(result).toEqual({ default: mockComponent });
            expect(getComponentModule).toHaveBeenCalledWith(
                moduleWithDefault,
                mockComponentName,
            );
        });

        it('should work with named export', async () => {
            const moduleWithNamed: Types.ImportedModule = {
                TestComponent: mockComponent,
            };
            const mockImportFn = vi.fn().mockResolvedValue(moduleWithNamed);
            vi.mocked(getComponentModule).mockReturnValue({
                default: mockComponent,
            });

            const result = await loadWithoutLogging(
                mockImportFn,
                'TestComponent',
            );

            expect(result).toEqual({ default: mockComponent });
            expect(getComponentModule).toHaveBeenCalledWith(
                moduleWithNamed,
                'TestComponent',
            );
        });

        it('should handle different component names', async () => {
            const mockImportFn = vi.fn().mockResolvedValue(mockModule);
            vi.mocked(getComponentModule).mockReturnValue({
                default: mockComponent,
            });

            const result = await loadWithoutLogging(
                mockImportFn,
                'DifferentName',
            );

            expect(result).toEqual({ default: mockComponent });
            expect(getComponentModule).toHaveBeenCalledWith(
                mockModule,
                'DifferentName',
            );
        });
    });

    describe('error handling', () => {
        it('should throw when importFn rejects', async () => {
            const networkError = new Error('Network error');
            const mockImportFn = vi.fn().mockRejectedValue(networkError);

            await expect(
                loadWithoutLogging(mockImportFn, mockComponentName),
            ).rejects.toThrow('Network error');

            expect(mockImportFn).toHaveBeenCalledTimes(1);
            expect(getComponentModule).not.toHaveBeenCalled();
        });

        it('should propagate error from getComponentModule', async () => {
            const mockImportFn = vi.fn().mockResolvedValue(mockModule);
            const componentError = new Error('Component not found');
            vi.mocked(getComponentModule).mockImplementation(() => {
                throw componentError;
            });

            await expect(
                loadWithoutLogging(mockImportFn, mockComponentName),
            ).rejects.toThrow('Component not found');

            expect(mockImportFn).toHaveBeenCalledTimes(1);
            expect(getComponentModule).toHaveBeenCalledTimes(1);
        });

        it('should handle non-Error rejection', async () => {
            const mockImportFn = vi.fn().mockRejectedValue('String error');

            await expect(
                loadWithoutLogging(mockImportFn, mockComponentName),
            ).rejects.toThrow('String error');
        });

        it('should handle empty module', async () => {
            const emptyModule = {};
            const mockImportFn = vi.fn().mockResolvedValue(emptyModule);
            vi.mocked(getComponentModule).mockImplementation(() => {
                throw new Error('Component not found');
            });

            await expect(
                loadWithoutLogging(mockImportFn, mockComponentName),
            ).rejects.toThrow('Component not found');
        });
    });

    describe('performance', () => {
        it('should resolve quickly', async () => {
            const mockImportFn = vi.fn().mockResolvedValue(mockModule);
            vi.mocked(getComponentModule).mockReturnValue({
                default: mockComponent,
            });

            const start = performance.now();
            await loadWithoutLogging(mockImportFn, mockComponentName);
            const end = performance.now();

            expect(end - start).toBeLessThan(50); // Должно быть быстро
        });

        it('should handle multiple calls', async () => {
            const mockImportFn = vi.fn().mockResolvedValue(mockModule);
            vi.mocked(getComponentModule).mockReturnValue({
                default: mockComponent,
            });

            const results = await Promise.all([
                loadWithoutLogging(mockImportFn, 'comp1'),
                loadWithoutLogging(mockImportFn, 'comp2'),
                loadWithoutLogging(mockImportFn, 'comp3'),
            ]);

            expect(results).toHaveLength(3);
            expect(mockImportFn).toHaveBeenCalledTimes(3);
            expect(getComponentModule).toHaveBeenCalledTimes(3);
        });
    });

    describe('edge cases', () => {
        it('should handle module with null value', async () => {
            const moduleWithNull: Types.ImportedModule = {
                default: undefined,
                TestComponent: undefined,
            };
            const mockImportFn = vi.fn().mockResolvedValue(moduleWithNull);
            vi.mocked(getComponentModule).mockReturnValue({
                default: mockComponent,
            });

            const result = await loadWithoutLogging(
                mockImportFn,
                mockComponentName,
            );

            expect(result).toEqual({ default: mockComponent });
        });

        it('should handle undefined component name', async () => {
            const mockImportFn = vi.fn().mockResolvedValue(mockModule);
            vi.mocked(getComponentModule).mockReturnValue({
                default: mockComponent,
            });

            // @ts-expect-error - testing undefined name
            const result = await loadWithoutLogging(mockImportFn, undefined);

            expect(result).toEqual({ default: mockComponent });
            expect(getComponentModule).toHaveBeenCalledWith(
                mockModule,
                undefined,
            );
        });
    });
});
