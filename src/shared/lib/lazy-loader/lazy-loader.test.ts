import { beforeEach, describe, expect, it, vi } from 'vitest';

import { lazyLoad } from './lazy-loader.lib';
import * as Libs from './libs';

const { lazy } = vi.hoisted(() => {
    return {
        lazy: vi.fn(<T>(loader: T): T => loader),
    };
});

vi.mock('react', () => ({
    lazy,
}));

vi.mock('./libs', () => ({
    loadWithLogging: vi.fn(),
    loadWithoutLogging: vi.fn(),
}));

describe('lazyLoad', () => {
    const mockComponentName = 'TestComponent';

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('when enabled is true', () => {
        it('should pass loadWithLogging to lazy', async () => {
            const mockImportFn = vi.fn();

            lazyLoad(mockImportFn, {
                componentName: mockComponentName,
                enabled: true,
            });

            expect(lazy).toHaveBeenCalledTimes(1);
            expect(lazy).toHaveBeenCalledWith(expect.any(Function));

            const loaderFn = vi.mocked(lazy).mock
                .calls[0]?.[0] as () => Promise<any>;
            await loaderFn();

            expect(Libs.loadWithLogging).toHaveBeenCalledTimes(1);
            expect(Libs.loadWithLogging).toHaveBeenCalledWith(
                mockImportFn,
                mockComponentName,
            );
            expect(Libs.loadWithoutLogging).not.toHaveBeenCalled();
        });
    });

    describe('when enabled is false', () => {
        it('should pass loadWithoutLogging to lazy', async () => {
            const mockImportFn = vi.fn();

            lazyLoad(mockImportFn, {
                componentName: mockComponentName,
                enabled: false,
            });

            expect(lazy).toHaveBeenCalledTimes(1);
            expect(lazy).toHaveBeenCalledWith(expect.any(Function));

            const loaderFn = vi.mocked(lazy).mock
                .calls[0]?.[0] as () => Promise<any>;
            await loaderFn();

            expect(Libs.loadWithoutLogging).toHaveBeenCalledTimes(1);
            expect(Libs.loadWithoutLogging).toHaveBeenCalledWith(
                mockImportFn,
                mockComponentName,
            );
            expect(Libs.loadWithLogging).not.toHaveBeenCalled();
        });
    });

    describe('when enabled is not provided', () => {
        it('should default to true and pass loadWithLogging to lazy', async () => {
            const mockImportFn = vi.fn();

            lazyLoad(mockImportFn, {
                componentName: mockComponentName,
            });

            expect(lazy).toHaveBeenCalledTimes(1);
            expect(lazy).toHaveBeenCalledWith(expect.any(Function));

            const loaderFn = vi.mocked(lazy).mock
                .calls[0]?.[0] as () => Promise<any>;
            await loaderFn();

            expect(Libs.loadWithLogging).toHaveBeenCalledTimes(1);
            expect(Libs.loadWithLogging).toHaveBeenCalledWith(
                mockImportFn,
                mockComponentName,
            );
            expect(Libs.loadWithoutLogging).not.toHaveBeenCalled();
        });
    });

    describe('return value', () => {
        it('should return whatever lazy returns', () => {
            const mockImportFn = vi.fn();
            const expectedResult = Symbol('lazy result');

            vi.mocked(lazy).mockReturnValueOnce(expectedResult as any);

            const result = lazyLoad(mockImportFn, {
                componentName: mockComponentName,
                enabled: true,
            });

            expect(result).toBe(expectedResult);
        });
    });

    describe('with different import functions', () => {
        it('should pass the correct importFn to loader', async () => {
            const importFn1 = vi.fn();
            const importFn2 = vi.fn();

            lazyLoad(importFn1, {
                componentName: mockComponentName,
                enabled: true,
            });

            lazyLoad(importFn2, {
                componentName: mockComponentName,
                enabled: true,
            });

            expect(lazy).toHaveBeenCalledTimes(2);

            const loaderFn1 = vi.mocked(lazy).mock
                .calls[0]?.[0] as () => Promise<any>;
            await loaderFn1();
            expect(Libs.loadWithLogging).toHaveBeenNthCalledWith(
                1,
                importFn1,
                mockComponentName,
            );

            const loaderFn2 = vi.mocked(lazy).mock
                .calls[1]?.[0] as () => Promise<any>;
            await loaderFn2();
            expect(Libs.loadWithLogging).toHaveBeenNthCalledWith(
                2,
                importFn2,
                mockComponentName,
            );
        });
    });
});
