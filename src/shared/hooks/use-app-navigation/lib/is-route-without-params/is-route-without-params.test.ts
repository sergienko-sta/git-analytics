import { describe, expect, it } from 'vitest';

import { EAppRoutes } from '../../../../constants';

import { isRouteWithoutParams } from './is-route-without-params.lib';

describe('isRouteWithoutParams', () => {
    it('should return true for HOME route', () => {
        expect(isRouteWithoutParams(EAppRoutes.HOME)).toBe(true);
    });

    it('should return true for NOT_FOUND route', () => {
        expect(isRouteWithoutParams(EAppRoutes.NOT_FOUND)).toBe(true);
    });

    it('should return false for routes that require parameters', () => {
        const routesWithParams = [EAppRoutes.PROFILE, EAppRoutes.REPOSITORY];

        routesWithParams.forEach((route) => {
            expect(isRouteWithoutParams(route)).toBe(false);
        });
    });

    it('should work as a type guard', () => {
        const route = EAppRoutes.HOME as EAppRoutes;

        if (isRouteWithoutParams(route)) {
            expect(route).toBe(EAppRoutes.HOME);
        }
    });

    it('should return false for all other routes', () => {
        const allRoutes = Object.values(EAppRoutes);
        const routesWithoutParams = [EAppRoutes.HOME, EAppRoutes.NOT_FOUND];

        allRoutes.forEach((route) => {
            if (routesWithoutParams.includes(route as EAppRoutes)) {
                expect(isRouteWithoutParams(route as EAppRoutes)).toBe(true);
            } else {
                expect(isRouteWithoutParams(route as EAppRoutes)).toBe(false);
            }
        });
    });
});
