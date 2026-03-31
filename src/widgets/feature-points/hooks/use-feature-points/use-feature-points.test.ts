import { useTranslation } from 'react-i18next';
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as Constants from '../../constants';

import { useFeaturePoints } from './use-feature-points.hook';

vi.mock('react-i18next', () => ({
    useTranslation: vi.fn(),
}));

vi.mock('../../constants', () => ({
    FEATURES: [
        { id: 1, key: 'search', name: 'Search' },
        { id: 2, key: 'api', name: 'API' },
        { id: 3, key: 'trending', name: 'Trending' },
        { id: 4, key: 'analytics', name: 'Analytics' },
    ],
}));

describe('useFeaturePoints', () => {
    const mockT = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useTranslation).mockReturnValue({
            t: mockT,
            i18n: {} as ReturnType<typeof useTranslation>['i18n'],
            ready: true,
        } as unknown as ReturnType<typeof useTranslation>);
    });

    describe('when translation is loaded successfully', () => {
        beforeEach(() => {
            mockT.mockReturnValue({
                section: {
                    title: 'Что вы можете сделать с помощью {{appName}}?',
                    description: 'Инструменты для глубокого анализа GitHub',
                },
                features: [
                    {
                        id: 1,
                        key: 'search',
                        title: 'Мощный поиск',
                        description:
                            'Ищите репозитории по языкам, звездам, форкам и другим параметрам',
                    },
                    {
                        id: 2,
                        key: 'api',
                        title: 'GitHub API интеграция',
                        description:
                            'Полный доступ к данным GitHub в реальном времени',
                    },
                    {
                        id: 3,
                        key: 'trending',
                        title: 'Трендовые проекты',
                        description:
                            'Будьте в курсе самых популярных и быстрорастущих репозиториев',
                    },
                    {
                        id: 4,
                        key: 'analytics',
                        title: 'Аналитика активности',
                        description:
                            'Отслеживайте коммиты, пул-реквесты и активность разработчиков',
                    },
                ],
            });
        });

        it('should return mapped features with translations', () => {
            const { result } = renderHook(() => useFeaturePoints());

            expect(mockT).toHaveBeenCalledWith('feature-points', {
                returnObjects: true,
            });

            expect(result.current).toHaveLength(Constants.FEATURES.length);

            expect(result.current[0]).toEqual({
                ...Constants.FEATURES[0],
                title: 'Мощный поиск',
                description:
                    'Ищите репозитории по языкам, звездам, форкам и другим параметрам',
            });
        });
    });

    describe('when translation is null', () => {
        it('should handle null translation without throwing error', () => {
            mockT.mockReturnValue(null);

            const { result } = renderHook(() => useFeaturePoints());

            expect(result.current).toHaveLength(Constants.FEATURES.length);
            result.current.forEach((feature) => {
                expect(feature.title).toBe('');
                expect(feature.description).toBe('');
            });
        });
    });

    describe('when translation is undefined', () => {
        it('should handle undefined translation without throwing error', () => {
            mockT.mockReturnValue(undefined);

            const { result } = renderHook(() => useFeaturePoints());

            expect(result.current).toHaveLength(Constants.FEATURES.length);
            result.current.forEach((feature) => {
                expect(feature.title).toBe('');
                expect(feature.description).toBe('');
            });
        });
    });

    describe('when translation has no features property', () => {
        it('should handle missing features array', () => {
            mockT.mockReturnValue({
                section: {
                    title: 'Title',
                    description: 'Description',
                },
            });

            const { result } = renderHook(() => useFeaturePoints());

            expect(result.current).toHaveLength(Constants.FEATURES.length);
            result.current.forEach((feature) => {
                expect(feature.title).toBe('');
                expect(feature.description).toBe('');
            });
        });
    });

    describe('when translation has features as null', () => {
        it('should handle features property being null', () => {
            mockT.mockReturnValue({
                section: { title: 'Title', description: 'Desc' },
                features: null,
            });

            const { result } = renderHook(() => useFeaturePoints());

            expect(result.current).toHaveLength(Constants.FEATURES.length);
            result.current.forEach((feature) => {
                expect(feature.title).toBe('');
                expect(feature.description).toBe('');
            });
        });
    });

    describe('when translation has empty features array', () => {
        it('should return features with empty strings', () => {
            mockT.mockReturnValue({ features: [] });

            const { result } = renderHook(() => useFeaturePoints());

            result.current.forEach((feature) => {
                expect(feature.title).toBe('');
                expect(feature.description).toBe('');
            });
        });
    });

    describe('when translation has partial features', () => {
        beforeEach(() => {
            mockT.mockReturnValue({
                features: [
                    {
                        id: 1,
                        key: 'search',
                        title: 'Мощный поиск',
                        description: 'Ищите репозитории',
                    },
                ],
            });
        });

        it('should use empty strings for missing translations', () => {
            const { result } = renderHook(() => useFeaturePoints());

            expect(result.current[0]?.title).toBe('Мощный поиск');
            expect(result.current[0]?.description).toBe('Ищите репозитории');

            expect(result.current[1]?.title).toBe('');
            expect(result.current[1]?.description).toBe('');
            expect(result.current[2]?.title).toBe('');
            expect(result.current[2]?.description).toBe('');
            expect(result.current[3]?.title).toBe('');
            expect(result.current[3]?.description).toBe('');
        });
    });

    describe('when translation has features with wrong order', () => {
        beforeEach(() => {
            mockT.mockReturnValue({
                features: [
                    {
                        id: 4,
                        key: 'analytics',
                        title: 'Analytics Title',
                        description: 'Analytics Desc',
                    },
                    {
                        id: 2,
                        key: 'api',
                        title: 'API Title',
                        description: 'API Desc',
                    },
                    {
                        id: 1,
                        key: 'search',
                        title: 'Search Title',
                        description: 'Search Desc',
                    },
                    {
                        id: 3,
                        key: 'trending',
                        title: 'Trending Title',
                        description: 'Trending Desc',
                    },
                ],
            });
        });

        it('should correctly map by id regardless of order', () => {
            const { result } = renderHook(() => useFeaturePoints());

            expect(result.current.find((f) => f.id === 1)?.title).toBe(
                'Search Title',
            );
            expect(result.current.find((f) => f.id === 2)?.title).toBe(
                'API Title',
            );
            expect(result.current.find((f) => f.id === 3)?.title).toBe(
                'Trending Title',
            );
            expect(result.current.find((f) => f.id === 4)?.title).toBe(
                'Analytics Title',
            );
        });
    });

    describe('when translation has features with missing fields', () => {
        it('should handle missing title and description', () => {
            mockT.mockReturnValue({
                features: [{ id: 1, key: 'search' }],
            });

            const { result } = renderHook(() => useFeaturePoints());

            expect(result.current[0]?.title).toBe('');
            expect(result.current[0]?.description).toBe('');
        });

        it('should handle title as null', () => {
            mockT.mockReturnValue({
                features: [
                    {
                        id: 1,
                        key: 'search',
                        title: null,
                        description: 'Description',
                    },
                ],
            });

            const { result } = renderHook(() => useFeaturePoints());

            expect(result.current[0]?.title).toBe('');
            expect(result.current[0]?.description).toBe('Description');
        });
    });

    describe('memoization', () => {
        it('should return same reference when t function does not change', () => {
            const { result, rerender } = renderHook(() => useFeaturePoints());
            const firstResult = result.current;

            rerender();

            expect(result.current).toBe(firstResult);
        });

        it('should return new reference when t function changes', () => {
            const { result, rerender } = renderHook(() => useFeaturePoints());
            const firstResult = result.current;

            const newMockT = vi.fn().mockReturnValue({
                features: [
                    {
                        id: 1,
                        title: 'New Title',
                        description: 'New Description',
                    },
                ],
            });
            vi.mocked(useTranslation).mockReturnValue({
                t: newMockT,
                i18n: {} as ReturnType<typeof useTranslation>['i18n'],
                ready: true,
            } as unknown as ReturnType<typeof useTranslation>);

            rerender();

            expect(result.current).not.toBe(firstResult);
            expect(newMockT).toHaveBeenCalledWith('feature-points', {
                returnObjects: true,
            });
        });
    });

    describe('edge cases', () => {
        it('should handle translation with extra properties', () => {
            mockT.mockReturnValue({
                features: [
                    {
                        id: 1,
                        key: 'search',
                        title: 'Title',
                        description: 'Desc',
                        extra: 'extra',
                    },
                ],
            });

            const { result } = renderHook(() => useFeaturePoints());

            expect(result.current[0]?.title).toBe('Title');
            expect(result.current[0]?.description).toBe('Desc');
        });

        it('should handle when Constants.FEATURES is empty', () => {
            vi.mocked(Constants).FEATURES = [];

            mockT.mockReturnValue({
                features: [{ id: 1, title: 'Title', description: 'Desc' }],
            });

            const { result } = renderHook(() => useFeaturePoints());

            expect(result.current).toHaveLength(0);
        });
    });
});
