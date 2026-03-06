import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { EAppRoutes } from '../../constants';

import { isRouteWithoutParams } from './lib';
// Импортируем тестируемый хук после моков
import { useAppNavigate } from './use-app-navigation.hook';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(() => mockNavigate),
}));

vi.mock('../../model', () => {
    const mockHomeFn = vi.fn(() => '/');
    const mockNotFoundFn = vi.fn(() => '/404');
    const mockProfileFn = vi.fn((params) => {
        if (!params || typeof params !== 'object') {
            return '/profile/undefined';
        }
        return `/profile/${params.login || 'unknown'}`;
    });

    return {
        routePathFunctions: {
            [EAppRoutes.HOME]: mockHomeFn,
            [EAppRoutes.NOT_FOUND]: mockNotFoundFn,
            [EAppRoutes.PROFILE]: mockProfileFn,
        },
        RouteParams: {},
    };
});

vi.mock('./lib', () => {
    const mockIsRouteWithoutParams = vi.fn((route) => {
        return route === EAppRoutes.HOME || route === EAppRoutes.NOT_FOUND;
    });

    return {
        isRouteWithoutParams: mockIsRouteWithoutParams,
    };
});

describe('useAppNavigate', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockNavigate.mockClear();
    });

    describe('to function', () => {
        it('should navigate to HOME route without parameters', () => {
            const { result } = renderHook(() => useAppNavigate());

            act(() => {
                (result.current.to as any)(EAppRoutes.HOME);
            });

            expect(mockNavigate).toHaveBeenCalledWith('/');
        });

        it('should navigate to NOT_FOUND route without parameters', () => {
            const { result } = renderHook(() => useAppNavigate());

            act(() => {
                (result.current.to as any)(EAppRoutes.NOT_FOUND);
            });

            expect(mockNavigate).toHaveBeenCalledWith('/404');
        });

        it('should navigate to PROFILE route with login parameter', () => {
            const { result } = renderHook(() => useAppNavigate());
            const params = { login: 'john_doe' };

            act(() => {
                result.current.to(EAppRoutes.PROFILE, params);
            });

            expect(mockNavigate).toHaveBeenCalledWith('/profile/john_doe');
        });

        it('should call isRouteWithoutParams for route determination', () => {
            const { result } = renderHook(() => useAppNavigate());

            act(() => {
                (result.current.to as any)(EAppRoutes.HOME);
            });

            expect(isRouteWithoutParams).toHaveBeenCalledWith(EAppRoutes.HOME);
        });

        it('should handle different login values for PROFILE route', () => {
            const { result } = renderHook(() => useAppNavigate());
            const testCases = [
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
            });
        });

        it('should handle undefined parameters for PROFILE route', () => {
            const { result } = renderHook(() => useAppNavigate());

            act(() => {
                result.current.to(EAppRoutes.PROFILE, undefined as any);
            });

            expect(mockNavigate).toHaveBeenCalledWith('/profile/undefined');
        });

        it('should handle empty parameter object for PROFILE route', () => {
            const { result } = renderHook(() => useAppNavigate());

            act(() => {
                result.current.to(EAppRoutes.PROFILE, {} as any);
            });

            expect(mockNavigate).toHaveBeenCalledWith('/profile/unknown');
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
                (result.current.to as any)(EAppRoutes.HOME);
                result.current.to(EAppRoutes.PROFILE, { login: 'john_doe' });
                result.current.back();
                result.current.forward();
                (result.current.to as any)(EAppRoutes.NOT_FOUND);
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
                    (result.current.to as any)(nonExistentRoute);
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
