import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { EAppRoutes } from '../../constants';
import type { RouteParams } from '../../model';

import { useAppNavigate } from './use-app-navigation.hook';

const {
    mockNavigate,
    mockHomeFn,
    mockNotFoundFn,
    mockProfileFn,
    mockIsRouteWithoutParams,
} = vi.hoisted(() => {
    const mockNavigate = vi.fn();

    const mockHomeFn = vi.fn(() => '/');
    const mockNotFoundFn = vi.fn(() => '/404');
    const mockProfileFn = vi.fn((params?: RouteParams[EAppRoutes.PROFILE]) => {
        if (!params || typeof params !== 'object') {
            return '/profile/undefined';
        }
        return `/profile/${params.login || 'unknown'}`;
    });

    const mockIsRouteWithoutParams = vi.fn((route: EAppRoutes) => {
        return route === EAppRoutes.HOME || route === EAppRoutes.NOT_FOUND;
    });

    return {
        mockNavigate,
        mockHomeFn,
        mockNotFoundFn,
        mockProfileFn,
        mockIsRouteWithoutParams,
    };
});

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(() => mockNavigate),
}));

vi.mock('../../model', () => ({
    routePathFunctions: {
        [EAppRoutes.HOME]: mockHomeFn,
        [EAppRoutes.NOT_FOUND]: mockNotFoundFn,
        [EAppRoutes.PROFILE]: mockProfileFn,
    },
    RouteParams: {},
}));

vi.mock('./lib', () => ({
    isRouteWithoutParams: mockIsRouteWithoutParams,
}));

describe('useAppNavigate', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockNavigate.mockClear();
        mockHomeFn.mockClear();
        mockNotFoundFn.mockClear();
        mockProfileFn.mockClear();
        mockIsRouteWithoutParams.mockClear();
    });

    describe('to function', () => {
        it('should navigate to HOME route without parameters', () => {
            const { result } = renderHook(() => useAppNavigate());

            act(() => {
                result.current.to(EAppRoutes.HOME, {});
            });

            expect(mockNavigate).toHaveBeenCalledWith('/');
            expect(mockHomeFn).toHaveBeenCalled();
        });

        it('should navigate to NOT_FOUND route without parameters', () => {
            const { result } = renderHook(() => useAppNavigate());

            act(() => {
                result.current.to(EAppRoutes.NOT_FOUND, {});
            });

            expect(mockNavigate).toHaveBeenCalledWith('/404');
            expect(mockNotFoundFn).toHaveBeenCalled();
        });

        it('should navigate to PROFILE route with login parameter', () => {
            const { result } = renderHook(() => useAppNavigate());
            const params: RouteParams[EAppRoutes.PROFILE] = {
                login: 'john_doe',
            };

            act(() => {
                result.current.to(EAppRoutes.PROFILE, params);
            });

            expect(mockNavigate).toHaveBeenCalledWith('/profile/john_doe');
            expect(mockProfileFn).toHaveBeenCalledWith(params);
        });

        it('should call isRouteWithoutParams for route determination', () => {
            const { result } = renderHook(() => useAppNavigate());

            act(() => {
                result.current.to(EAppRoutes.HOME, {});
            });

            expect(mockIsRouteWithoutParams).toHaveBeenCalledWith(
                EAppRoutes.HOME,
            );
        });

        it('should handle different login values for PROFILE route', () => {
            const { result } = renderHook(() => useAppNavigate());
            const testCases: RouteParams[EAppRoutes.PROFILE][] = [
                { login: 'alice_smith' },
                { login: 'bob.jones' },
                { login: 'charlie-123' },
            ];

            testCases.forEach((params, index) => {
                act(() => {
                    result.current.to(EAppRoutes.PROFILE, params);
                });

                expect(mockNavigate).toHaveBeenNthCalledWith(
                    index + 1,
                    `/profile/${params.login}`,
                );
                expect(mockProfileFn).toHaveBeenNthCalledWith(
                    index + 1,
                    params,
                );
            });
        });

        it('should handle undefined parameters for PROFILE route', () => {
            const { result } = renderHook(() => useAppNavigate());

            act(() => {
                // @ts-expect-error - тестируем поведение с undefined
                result.current.to(EAppRoutes.PROFILE, undefined);
            });

            expect(mockNavigate).toHaveBeenCalledWith('/profile/undefined');
            expect(mockProfileFn).toHaveBeenCalledWith(undefined);
        });

        it('should handle empty parameter object for PROFILE route', () => {
            const { result } = renderHook(() => useAppNavigate());

            act(() => {
                // @ts-expect-error - тестируем поведение с пустым объектом
                result.current.to(EAppRoutes.PROFILE, {});
            });

            expect(mockNavigate).toHaveBeenCalledWith('/profile/unknown');
            expect(mockProfileFn).toHaveBeenCalledWith({});
        });
    });

    describe('back function', () => {
        it('should navigate back one step', () => {
            const { result } = renderHook(() => useAppNavigate());

            act(() => {
                result.current.back();
            });

            expect(mockNavigate).toHaveBeenCalledTimes(1);
            expect(mockNavigate).toHaveBeenCalledWith(-1);
        });

        it('should navigate back multiple steps', () => {
            const { result } = renderHook(() => useAppNavigate());

            act(() => {
                result.current.back();
                result.current.back();
                result.current.back();
            });

            expect(mockNavigate).toHaveBeenCalledTimes(3);
            expect(mockNavigate).toHaveBeenNthCalledWith(1, -1);
            expect(mockNavigate).toHaveBeenNthCalledWith(2, -1);
            expect(mockNavigate).toHaveBeenNthCalledWith(3, -1);
        });
    });

    describe('forward function', () => {
        it('should navigate forward one step', () => {
            const { result } = renderHook(() => useAppNavigate());

            act(() => {
                result.current.forward();
            });

            expect(mockNavigate).toHaveBeenCalledTimes(1);
            expect(mockNavigate).toHaveBeenCalledWith(1);
        });

        it('should navigate forward multiple steps', () => {
            const { result } = renderHook(() => useAppNavigate());

            act(() => {
                result.current.forward();
                result.current.forward();
            });

            expect(mockNavigate).toHaveBeenCalledTimes(2);
            expect(mockNavigate).toHaveBeenNthCalledWith(1, 1);
            expect(mockNavigate).toHaveBeenNthCalledWith(2, 1);
        });
    });

    describe('integration tests', () => {
        it('should handle complete navigation sequence', () => {
            const { result } = renderHook(() => useAppNavigate());

            act(() => {
                result.current.to(EAppRoutes.HOME, {});
                result.current.to(EAppRoutes.PROFILE, { login: 'john_doe' });
                result.current.back();
                result.current.forward();
                result.current.to(EAppRoutes.NOT_FOUND, {});
            });

            expect(mockNavigate).toHaveBeenCalledTimes(5);
            expect(mockNavigate).toHaveBeenNthCalledWith(1, '/');
            expect(mockNavigate).toHaveBeenNthCalledWith(
                2,
                '/profile/john_doe',
            );
            expect(mockNavigate).toHaveBeenNthCalledWith(3, -1);
            expect(mockNavigate).toHaveBeenNthCalledWith(4, 1);
            expect(mockNavigate).toHaveBeenNthCalledWith(5, '/404');
        });
    });

    describe('error handling', () => {
        it('should throw error for non-existent routes', () => {
            const { result } = renderHook(() => useAppNavigate());
            const nonExistentRoute = 'NON_EXISTENT_ROUTE' as EAppRoutes;

            expect(() => {
                act(() => {
                    result.current.to(nonExistentRoute, {});
                });
            }).toThrow();
        });
    });

    describe('memoization', () => {
        it('should memoize all functions', () => {
            const { result, rerender } = renderHook(() => useAppNavigate());
            const firstToRef = result.current.to;
            const firstBackRef = result.current.back;
            const firstForwardRef = result.current.forward;

            rerender();

            expect(result.current.to).toBe(firstToRef);
            expect(result.current.back).toBe(firstBackRef);
            expect(result.current.forward).toBe(firstForwardRef);
        });
    });
});
