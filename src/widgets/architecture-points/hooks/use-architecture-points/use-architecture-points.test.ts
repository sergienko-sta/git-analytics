import { useTranslation } from 'react-i18next';
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as Constants from '../../constants';

import { useArchitecturePoints } from './use-architecture-points.hook';

vi.mock('react-i18next', () => ({
    useTranslation: vi.fn(),
}));

vi.mock('../../constants', () => ({
    ARCHITECTURE_POINTS: [
        { key: 'react', icon: 'react-icon', order: 1 },
        { key: 'typescript', icon: 'ts-icon', order: 2 },
        { key: 'router', icon: 'router-icon', order: 3 },
        { key: 'fsd', icon: 'fsd-icon', order: 4 },
        { key: 'api-client', icon: 'api-icon', order: 5 },
        { key: 'performance', icon: 'performance-icon', order: 6 },
        { key: 'design-system', icon: 'design-icon', order: 7 },
        { key: 'i18n', icon: 'i18n-icon', order: 8 },
    ],
}));

describe('useArchitecturePoints', () => {
    const mockT = vi.fn();

    const createTranslation = (
        key: string,
        data: { title: string; description: string; highlights: string[] },
    ) => {
        return {
            [`architecture-points.${key}.title`]: data.title,
            [`architecture-points.${key}.description`]: data.description,
            [`architecture-points.${key}.highlights`]: data.highlights,
        };
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useTranslation).mockReturnValue({
            t: mockT,
            i18n: {} as ReturnType<typeof useTranslation>['i18n'],
            ready: true,
        } as unknown as ReturnType<typeof useTranslation>);
    });

    describe('when all translations are available', () => {
        beforeEach(() => {
            const allTranslations = {
                ...createTranslation('architecture.react', {
                    title: 'React 18+',
                    description:
                        'Современный React с хуками, Suspense, Concurrent features и оптимизациями производительности',
                    highlights: [
                        'Hooks API',
                        'Concurrent режим',
                        'Suspense',
                        'useMemo/useCallback',
                    ],
                }),
                ...createTranslation('architecture.typescript', {
                    title: 'TypeScript v5',
                    description:
                        'Строгая типизация с полным покрытием кода, advanced типы, utility types и type guards',
                    highlights: [
                        'Строгая типизация',
                        'Generic типы',
                        'Utility types',
                        'Безопасность типов',
                    ],
                }),
                ...createTranslation('architecture.router', {
                    title: 'React Router DOM v6',
                    description:
                        'Декларативная маршрутизация с защищенными роутами, ленивой загрузкой и вложенными маршрутами',
                    highlights: [
                        'Защищенные роуты',
                        'Lazy loading',
                        'Nested routes',
                        'Data loading',
                    ],
                }),
            };

            mockT.mockImplementation((key: string) => {
                return allTranslations[key] || '';
            });
        });

        it('should call useTranslation with correct namespace', () => {
            renderHook(() => useArchitecturePoints());

            expect(useTranslation).toHaveBeenCalledWith('widgets');
        });

        it('should return mapped architecture points with all translations', () => {
            const { result } = renderHook(() => useArchitecturePoints());

            expect(result.current).toHaveLength(
                Constants.ARCHITECTURE_POINTS.length,
            );

            expect(result.current[0]).toEqual({
                ...Constants.ARCHITECTURE_POINTS[0],
                title: 'React 18+',
                description:
                    'Современный React с хуками, Suspense, Concurrent features и оптимизациями производительности',
                highlights: [
                    'Hooks API',
                    'Concurrent режим',
                    'Suspense',
                    'useMemo/useCallback',
                ],
            });

            const tsPoint = result.current.find((p) => p.key === 'typescript');
            expect(tsPoint).toEqual({
                ...Constants.ARCHITECTURE_POINTS.find(
                    (p) => p.key === 'typescript',
                ),
                title: 'TypeScript v5',
                description:
                    'Строгая типизация с полным покрытием кода, advanced типы, utility types и type guards',
                highlights: [
                    'Строгая типизация',
                    'Generic типы',
                    'Utility types',
                    'Безопасность типов',
                ],
            });
        });

        it('should call t function with correct keys', () => {
            renderHook(() => useArchitecturePoints());

            expect(mockT).toHaveBeenCalledWith(
                'architecture-points.architecture.react.title',
            );
            expect(mockT).toHaveBeenCalledWith(
                'architecture-points.architecture.react.description',
            );
            expect(mockT).toHaveBeenCalledWith(
                'architecture-points.architecture.react.highlights',
                {
                    returnObjects: true,
                },
            );

            expect(mockT).toHaveBeenCalledWith(
                'architecture-points.architecture.typescript.title',
            );
            expect(mockT).toHaveBeenCalledWith(
                'architecture-points.architecture.typescript.description',
            );
            expect(mockT).toHaveBeenCalledWith(
                'architecture-points.architecture.typescript.highlights',
                {
                    returnObjects: true,
                },
            );
        });
    });

    describe('when translations are missing', () => {
        beforeEach(() => {
            mockT.mockImplementation(
                (key: string, options?: Record<string, unknown>) => {
                    if (options?.['returnObjects']) return [];
                    return '';
                },
            );
        });

        it('should return points with empty strings and empty arrays', () => {
            const { result } = renderHook(() => useArchitecturePoints());

            result.current.forEach((point) => {
                expect(point.title).toBe('');
                expect(point.description).toBe('');
                expect(point.highlights).toEqual([]);
            });
        });
    });

    describe('when translations are partial', () => {
        beforeEach(() => {
            mockT.mockImplementation(
                (key: string, options?: Record<string, unknown>) => {
                    if (key.includes('react.title')) return 'React 18+';
                    if (key.includes('react.description'))
                        return 'React description';
                    if (key.includes('react.highlights'))
                        return ['Highlight 1', 'Highlight 2'];

                    if (options?.['returnObjects']) return [];
                    return '';
                },
            );
        });

        it('should fill only available translations', () => {
            const { result } = renderHook(() => useArchitecturePoints());

            const reactPoint = result.current.find((p) => p.key === 'react');
            expect(reactPoint?.title).toBe('React 18+');
            expect(reactPoint?.description).toBe('React description');
            expect(reactPoint?.highlights).toEqual([
                'Highlight 1',
                'Highlight 2',
            ]);

            const tsPoint = result.current.find((p) => p.key === 'typescript');
            expect(tsPoint?.title).toBe('');
            expect(tsPoint?.description).toBe('');
            expect(tsPoint?.highlights).toEqual([]);
        });
    });

    describe('when highlights translation returns different formats', () => {
        it('should handle highlights as array', () => {
            mockT.mockImplementation(
                (key: string, options?: Record<string, unknown>) => {
                    if (
                        key.includes('react.highlights') &&
                        options?.['returnObjects']
                    ) {
                        return ['Highlight 1', 'Highlight 2', 'Highlight 3'];
                    }
                    if (key.includes('react.title')) return 'Title';
                    if (key.includes('react.description')) return 'Description';
                    return '';
                },
            );

            const { result } = renderHook(() => useArchitecturePoints());

            expect(result.current[0]?.highlights).toEqual([
                'Highlight 1',
                'Highlight 2',
                'Highlight 3',
            ]);
        });

        it('should handle highlights as null', () => {
            mockT.mockImplementation(
                (key: string, options?: Record<string, unknown>) => {
                    if (
                        key.includes('react.highlights') &&
                        options?.['returnObjects']
                    ) {
                        return null;
                    }
                    if (key.includes('react.title')) return 'Title';
                    if (key.includes('react.description')) return 'Description';
                    return '';
                },
            );

            const { result } = renderHook(() => useArchitecturePoints());

            expect(result.current[0]?.highlights).toBeNull();
        });

        it('should handle highlights as undefined', () => {
            mockT.mockImplementation(
                (key: string, options?: Record<string, unknown>) => {
                    if (
                        key.includes('react.highlights') &&
                        options?.['returnObjects']
                    ) {
                        return undefined;
                    }
                    if (key.includes('react.title')) return 'Title';
                    if (key.includes('react.description')) return 'Description';
                    return '';
                },
            );

            const { result } = renderHook(() => useArchitecturePoints());

            expect(result.current[0]?.highlights).toBeUndefined();
        });

        it('should handle highlights as string (fallback)', () => {
            mockT.mockImplementation(
                (key: string, options?: Record<string, unknown>) => {
                    if (
                        key.includes('react.highlights') &&
                        options?.['returnObjects']
                    ) {
                        return 'Single highlight';
                    }
                    if (key.includes('react.title')) return 'Title';
                    if (key.includes('react.description')) return 'Description';
                    return '';
                },
            );

            const { result } = renderHook(() => useArchitecturePoints());

            expect(result.current[0]?.highlights).toBe('Single highlight');
        });
    });

    describe('memoization', () => {
        it('should return same reference when t function does not change', () => {
            mockT.mockImplementation((key: string) => `Translated ${key}`);

            const { result, rerender } = renderHook(() =>
                useArchitecturePoints(),
            );
            const firstResult = result.current;

            rerender();

            expect(result.current).toBe(firstResult);
        });

        it('should return new reference when t function changes', () => {
            mockT.mockImplementation((key: string) => `First ${key}`);

            const { result, rerender } = renderHook(() =>
                useArchitecturePoints(),
            );
            const firstResult = result.current;

            const newMockT = vi
                .fn()
                .mockImplementation((key: string) => `Second ${key}`);
            vi.mocked(useTranslation).mockReturnValue({
                t: newMockT,
                i18n: {} as ReturnType<typeof useTranslation>['i18n'],
                ready: true,
            } as unknown as ReturnType<typeof useTranslation>);

            rerender();

            expect(result.current).not.toBe(firstResult);
        });
    });

    describe('edge cases', () => {
        it('should handle empty ARCHITECTURE_POINTS', () => {
            vi.mocked(Constants).ARCHITECTURE_POINTS = [];

            mockT.mockImplementation(() => '');

            const { result } = renderHook(() => useArchitecturePoints());

            expect(result.current).toHaveLength(0);
        });
    });
});
