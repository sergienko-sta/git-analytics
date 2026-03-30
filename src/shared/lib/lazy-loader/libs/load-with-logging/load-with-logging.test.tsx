import type { ComponentType, FunctionComponent } from 'react';
import {
    afterAll,
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from 'vitest';

import * as Constants from '../../constants';
import type * as Types from '../../lazy-loader.types';
import { getComponentModule } from '../get-component-module';

import { loadWithLogging } from './load-with-logging.lib';

vi.mock('../../constants', () => ({
    logMessages: {
        start: vi.fn((name) => `[${name}] start`),
        success: vi.fn((name, time) => `[${name}] success ${time}`),
        exports: vi.fn((name) => `[${name}] exports`),
        error: vi.fn((name) => `[${name}] error`),
    },
}));

vi.mock('../get-component-module', () => ({
    getComponentModule: vi.fn(),
}));

describe('loadWithLogging', () => {
    const mockComponentName = 'TestComponent';
    const mockComponent: ComponentType<any> = () => null;
    const mockModule: Types.ImportedModule = {
        default: mockComponent,
    };

    const consoleWarnSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {});
    const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
        consoleWarnSpy.mockClear();
        consoleErrorSpy.mockClear();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    afterAll(() => {
        consoleWarnSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    describe('successful loading', () => {
        it('should load module and return component', async () => {
            const mockImportFn = vi.fn().mockResolvedValue(mockModule);
            vi.mocked(getComponentModule).mockReturnValue({
                default: mockComponent,
            });

            const result = await loadWithLogging(
                mockImportFn,
                mockComponentName,
            );

            expect(result).toEqual({ default: mockComponent });
            expect(mockImportFn).toHaveBeenCalledTimes(1);
            expect(getComponentModule).toHaveBeenCalledWith(
                mockModule,
                mockComponentName,
            );
        });

        it('should log start message before loading', async () => {
            const mockImportFn = vi.fn().mockResolvedValue(mockModule);
            vi.mocked(getComponentModule).mockReturnValue({
                default: mockComponent,
            });

            await loadWithLogging(mockImportFn, mockComponentName);

            expect(Constants.logMessages.start).toHaveBeenCalledWith(
                mockComponentName,
            );
            expect(console.warn).toHaveBeenCalledWith(
                `[${mockComponentName}] start`,
            );
        });

        it('should log success message with load time', async () => {
            const mockImportFn = vi.fn().mockImplementation(async () => {
                await new Promise((resolve) => setTimeout(resolve, 100));
                return mockModule;
            });
            vi.mocked(getComponentModule).mockReturnValue({
                default: mockComponent,
            });

            const promise = loadWithLogging(mockImportFn, mockComponentName);

            await vi.advanceTimersByTimeAsync(100);
            await promise;

            expect(Constants.logMessages.success).toHaveBeenCalledWith(
                mockComponentName,
                expect.stringMatching(/^\d+\.\d{2}$/),
            );
            expect(console.warn).toHaveBeenCalledWith(
                expect.stringMatching(/\[TestComponent\] success \d+\.\d{2}/),
            );
        });

        it('should log module exports', async () => {
            const moduleWithExports = {
                default: mockComponent,
                extraExport: () => null,
                anotherExport: 'string',
            };
            const mockImportFn = vi.fn().mockResolvedValue(moduleWithExports);
            vi.mocked(getComponentModule).mockReturnValue({
                default: mockComponent,
            });

            await loadWithLogging(mockImportFn, mockComponentName);

            expect(Constants.logMessages.exports).toHaveBeenCalledWith(
                mockComponentName,
            );
            expect(console.warn).toHaveBeenCalledWith(
                `[${mockComponentName}] exports`,
                ['default', 'extraExport', 'anotherExport'],
            );
        });

        it('should handle zero load time', async () => {
            const mockImportFn = vi.fn().mockResolvedValue(mockModule);
            vi.mocked(getComponentModule).mockReturnValue({
                default: mockComponent,
            });

            await loadWithLogging(mockImportFn, mockComponentName);

            expect(Constants.logMessages.success).toHaveBeenCalledWith(
                mockComponentName,
                expect.stringMatching(/^0\.00$/),
            );
        });
    });

    describe('error handling', () => {
        it('should handle import function rejection', async () => {
            const networkError = new Error('Network error');
            const mockImportFn = vi.fn().mockRejectedValue(networkError);

            await expect(
                loadWithLogging(mockImportFn, mockComponentName),
            ).rejects.toThrow('Network error');

            expect(Constants.logMessages.error).toHaveBeenCalledWith(
                mockComponentName,
            );
            expect(console.error).toHaveBeenCalledWith(
                `[${mockComponentName}] error`,
                'Network error',
            );
        });

        it('should handle non-Error rejection', async () => {
            const mockImportFn = vi.fn().mockRejectedValue('String error');

            await expect(
                loadWithLogging(mockImportFn, mockComponentName),
            ).rejects.toThrow('String error');

            expect(console.error).toHaveBeenCalledWith(
                `[${mockComponentName}] error`,
                'Unknown error occurred',
            );
        });

        it('should handle getComponentModule throwing error', async () => {
            const mockImportFn = vi.fn().mockResolvedValue(mockModule);
            const componentError = new Error('Component not found');
            vi.mocked(getComponentModule).mockImplementation(() => {
                throw componentError;
            });

            await expect(
                loadWithLogging(mockImportFn, mockComponentName),
            ).rejects.toThrow('Component not found');

            expect(console.error).toHaveBeenCalledWith(
                `[${mockComponentName}] error`,
                'Component not found',
            );
        });

        it('should handle empty module', async () => {
            const emptyModule = {};
            const mockImportFn = vi.fn().mockResolvedValue(emptyModule);
            vi.mocked(getComponentModule).mockImplementation(() => {
                throw new Error('Component not found');
            });

            await expect(
                loadWithLogging(mockImportFn, mockComponentName),
            ).rejects.toThrow();

            expect(console.warn).toHaveBeenCalledWith(
                `[${mockComponentName}] exports`,
                [],
            );
        });
    });

    describe('timing and order', () => {
        it('should log in correct order', async () => {
            const mockImportFn = vi.fn().mockResolvedValue(mockModule);
            vi.mocked(getComponentModule).mockReturnValue({
                default: mockComponent,
            });

            const consoleWarnSpy = vi.spyOn(console, 'warn');
            const consoleErrorSpy = vi.spyOn(console, 'error');

            await loadWithLogging(mockImportFn, mockComponentName);

            expect(consoleWarnSpy.mock.calls[0]?.[0]).toContain('start');
            expect(consoleWarnSpy.mock.calls[1]?.[0]).toContain('success');
            expect(consoleWarnSpy.mock.calls[2]?.[0]).toContain('exports');
            expect(consoleErrorSpy).not.toHaveBeenCalled();
        });

        it('should measure time correctly', async () => {
            const mockImportFn = vi.fn().mockImplementation(async () => {
                await new Promise((resolve) => setTimeout(resolve, 200));
                return mockModule;
            });
            vi.mocked(getComponentModule).mockReturnValue({
                default: mockComponent,
            });

            const startTime = Date.now();
            const promise = loadWithLogging(mockImportFn, mockComponentName);

            await vi.advanceTimersByTimeAsync(200);
            await promise;

            const endTime = Date.now();
            expect(endTime - startTime).toBeGreaterThanOrEqual(200);
        });
    });

    describe('with custom props', () => {
        it('should work with custom props type', async () => {
            interface CustomProps {
                title: string;
                count: number;
            }
            const CustomComponent: FunctionComponent<CustomProps> = () => null;
            const customModule: Types.ImportedModule<CustomProps> = {
                default: CustomComponent,
            };

            const mockImportFn = vi.fn().mockResolvedValue(customModule);

            vi.mocked(getComponentModule).mockImplementation(
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                <T,>(module: Types.ImportedModule<T>, name: string) => {
                    return { default: CustomComponent as ComponentType<T> };
                },
            );

            const result = await loadWithLogging<CustomProps>(
                mockImportFn,
                mockComponentName,
            );

            expect(result).toBeDefined();
            expect(result.default).toBe(CustomComponent);

            // const _typeCheck: ComponentType<CustomProps> = result.default;
            const TestComponent = result.default;
            const element = <TestComponent title='test' count={42} />;

            expect(element).toBeDefined();
        });
    });

    describe('performance', () => {
        it('should handle large modules efficiently', async () => {
            const largeModule = {
                default: mockComponent,
                ...Object.fromEntries(
                    Array.from({ length: 100 }, (_, i) => [
                        `export${i}`,
                        () => null,
                    ]),
                ),
            };
            const mockImportFn = vi.fn().mockResolvedValue(largeModule);
            vi.mocked(getComponentModule).mockReturnValue({
                default: mockComponent,
            });

            const start = performance.now();
            await loadWithLogging(mockImportFn, mockComponentName);
            const end = performance.now();

            expect(end - start).toBeLessThan(100);
            expect(console.warn).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining(['export0', 'export99']),
            );
        });
    });
});
