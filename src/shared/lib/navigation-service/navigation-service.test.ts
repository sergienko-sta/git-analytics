import { describe, expect, it } from 'vitest';

import { EAppRoutes, NAVIGATION_TAB_ITEMS } from '../../constants';

import { navigationService } from './navigation-service.lib';

describe('navigationService', () => {
    describe('getItemByKey', () => {
        it('✅ should return navigation item for existing key', () => {
            const result = navigationService.getItemByKey(EAppRoutes.HOME);

            expect(result).toBeDefined();
            expect(result?.key).toBe(EAppRoutes.HOME);
            expect(result?.path).toBe('/');
        });

        it('✅ should return undefined for non-existent key', () => {
            const result = navigationService.getItemByKey(
                'non-existent' as EAppRoutes,
            );

            expect(result).toBeUndefined();
        });

        it('✅ should return correct item for each key in NAVIGATION_TAB_ITEMS', () => {
            NAVIGATION_TAB_ITEMS.forEach((item) => {
                const result = navigationService.getItemByKey(item.key);
                expect(result).toEqual(item);
            });
        });
    });

    describe('getKeyByPath', () => {
        it('✅ should return key for existing path', () => {
            const result = navigationService.getKeyByPath('/');

            expect(result).toBe(EAppRoutes.HOME);
        });

        it('✅ should return undefined for non-existent path', () => {
            const result = navigationService.getKeyByPath('/non-existent-path');

            expect(result).toBeUndefined();
        });

        it('✅ should return correct key for each path in NAVIGATION_TAB_ITEMS', () => {
            NAVIGATION_TAB_ITEMS.forEach((item) => {
                const result = navigationService.getKeyByPath(item.path);
                expect(result).toBe(item.key);
            });
        });

        it('✅ should handle paths with trailing slashes correctly', () => {
            const result = navigationService.getKeyByPath('/users/');

            expect(result).toBeUndefined();
        });
    });

    describe('isHomeKey', () => {
        it('✅ should return true for HOME key', () => {
            const result = navigationService.isHomeKey(EAppRoutes.HOME);

            expect(result).toBe(true);
        });

        it('✅ should return false for non-HOME keys', () => {
            const nonHomeKeys = [
                EAppRoutes.PROFILE,
                EAppRoutes.REPOSITORY,
                EAppRoutes.NOT_FOUND,
            ];

            nonHomeKeys.forEach((key) => {
                const result = navigationService.isHomeKey(key);
                expect(result).toBe(false);
            });
        });

        it('✅ should handle undefined or null gracefully', () => {
            // @ts-expect-error - testing runtime behavior with invalid input
            const resultWithUndefined = navigationService.isHomeKey(undefined);
            // @ts-expect-error - testing runtime behavior with invalid input
            const resultWithNull = navigationService.isHomeKey(null);

            expect(resultWithUndefined).toBe(false);
            expect(resultWithNull).toBe(false);
        });
    });

    describe('getDefaultKey', () => {
        it('✅ should return HOME as default key', () => {
            const result = navigationService.getDefaultKey();

            expect(result).toBe(EAppRoutes.HOME);
        });

        it('✅ should always return the same value', () => {
            const firstCall = navigationService.getDefaultKey();
            const secondCall = navigationService.getDefaultKey();
            const thirdCall = navigationService.getDefaultKey();

            expect(firstCall).toBe(EAppRoutes.HOME);
            expect(secondCall).toBe(EAppRoutes.HOME);
            expect(thirdCall).toBe(EAppRoutes.HOME);
            expect(firstCall).toBe(secondCall);
            expect(secondCall).toBe(thirdCall);
        });
    });

    describe('integration tests', () => {
        it('✅ should maintain consistency between getItemByKey and getKeyByPath', () => {
            NAVIGATION_TAB_ITEMS.forEach((item) => {
                const keyByPath = navigationService.getKeyByPath(item.path);
                expect(keyByPath).toBe(item.key);

                const itemByKey = navigationService.getItemByKey(item.key);
                expect(itemByKey).toEqual(item);
                expect(itemByKey?.path).toBe(item.path);
            });
        });

        it('✅ should correctly identify home key across different methods', () => {
            const homeItem = NAVIGATION_TAB_ITEMS.find(
                (item) => item.key === EAppRoutes.HOME,
            );

            expect(homeItem).toBeDefined();
            expect(navigationService.isHomeKey(EAppRoutes.HOME)).toBe(true);
            expect(navigationService.getKeyByPath(homeItem!.path)).toBe(
                EAppRoutes.HOME,
            );
            expect(navigationService.getItemByKey(EAppRoutes.HOME)?.path).toBe(
                homeItem!.path,
            );
        });

        it('✅ should handle all routes from NAVIGATION_TAB_ITEMS', () => {
            const allKeys = NAVIGATION_TAB_ITEMS.map((item) => item.key);
            const allPaths = NAVIGATION_TAB_ITEMS.map((item) => item.path);

            allKeys.forEach((key) => {
                const item = navigationService.getItemByKey(key);
                expect(item).toBeDefined();
                expect(allPaths).toContain(item?.path);
            });

            allPaths.forEach((path) => {
                const key = navigationService.getKeyByPath(path);
                expect(key).toBeDefined();
                expect(allKeys).toContain(key);
            });
        });
    });

    describe('edge cases', () => {
        it('✅ should handle empty string as path', () => {
            const result = navigationService.getKeyByPath('');

            expect(result).toBeUndefined();
        });

        it('✅ should handle paths with query parameters', () => {
            const result = navigationService.getKeyByPath('/users?tab=profile');

            expect(result).toBeUndefined();
        });

        it('✅ should handle paths with hash', () => {
            const result = navigationService.getKeyByPath('/users#section');

            expect(result).toBeUndefined();
        });

        it('✅ should be case sensitive for paths', () => {
            const result = navigationService.getKeyByPath('/USERS');

            expect(result).toBeUndefined();
        });
    });
});
