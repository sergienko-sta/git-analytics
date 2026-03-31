import { useTranslation } from 'react-i18next';
import { type Location, useLocation } from 'react-router-dom';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as Shared from '@shared';

import * as Constants from '../../constants';

import { useRepositoryNavigation } from './use-repository-navigation.hook';

vi.mock('react-i18next', () => ({
    useTranslation: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
}));

vi.mock('@shared', () => ({
    useAppNavigate: vi.fn(() => ({
        to: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
    })),
}));

vi.mock('../../constants', () => ({
    TAB_KEYS: {
        COMPARE: 'compare',
        ISSUES: 'issues',
        PROJECTS: 'projects',
    } as const,
    TAB_CONFIG: [
        {
            key: 'compare',
            translationKey: 'compare',
            route: '/compare',
            check: (path: string) =>
                path === '/compare' || path.includes('/compare'),
        },
        {
            key: 'issues',
            translationKey: 'issues',
            route: '/issues',
            check: (path: string) =>
                path === '/issues' || path.includes('/issues'),
        },
        {
            key: 'projects',
            translationKey: 'projects',
            route: '/projects',
            check: (path: string) =>
                path === '/projects' || path.includes('/projects'),
        },
    ],
}));

describe('useRepositoryNavigation', () => {
    const mockT = vi.fn();
    const mockTo = vi.fn();
    const mockBack = vi.fn();
    const mockForward = vi.fn();

    const createMockLocation = (pathname: string): Location => ({
        pathname,
        search: '',
        hash: '',
        state: null,
        key: '',
    });

    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(useTranslation).mockReturnValue({
            t: mockT,
            i18n: {} as ReturnType<typeof useTranslation>['i18n'],
            ready: true,
        } as unknown as ReturnType<typeof useTranslation>);

        vi.mocked(Shared.useAppNavigate).mockReturnValue({
            to: mockTo,
            back: mockBack,
            forward: mockForward,
        });

        vi.mocked(useLocation).mockReturnValue(createMockLocation('/compare'));

        const translations: Record<string, string> = {
            'repository-layout.compare': 'Compare',
            'repository-layout.issues': 'Issues',
            'repository-layout.projects': 'Projects',
        };

        mockT.mockImplementation((key: string) => {
            return translations[key] || key;
        });
    });

    describe('initialization', () => {
        it('should call useTranslation with correct namespace', () => {
            renderHook(() => useRepositoryNavigation());
            expect(useTranslation).toHaveBeenCalledWith('widgets');
        });

        it('should call useAppNavigate', () => {
            renderHook(() => useRepositoryNavigation());
            expect(Shared.useAppNavigate).toHaveBeenCalled();
        });

        it('should call useLocation', () => {
            renderHook(() => useRepositoryNavigation());
            expect(useLocation).toHaveBeenCalled();
        });
    });

    describe('tabItems', () => {
        it('should return correct number of tab items', () => {
            const { result } = renderHook(() => useRepositoryNavigation());
            expect(result.current.tabItems).toHaveLength(
                Constants.TAB_CONFIG.length,
            );
        });

        it('should map tab items with correct keys and labels', () => {
            const { result } = renderHook(() => useRepositoryNavigation());

            expect(result.current.tabItems).toEqual([
                { key: 'compare', label: 'Compare' },
                { key: 'issues', label: 'Issues' },
                { key: 'projects', label: 'Projects' },
            ]);
        });

        it('should call t function with correct translation keys', () => {
            renderHook(() => useRepositoryNavigation());

            Constants.TAB_CONFIG.forEach((tab) => {
                expect(mockT).toHaveBeenCalledWith(
                    `repository-layout.${tab.translationKey}`,
                );
            });
        });

        it('should update tabItems when t function changes', () => {
            const { result, rerender } = renderHook(() =>
                useRepositoryNavigation(),
            );
            const firstItems = result.current.tabItems;

            const newMockT = vi.fn();
            newMockT.mockImplementation((key: string) => `New ${key}`);
            vi.mocked(useTranslation).mockReturnValue({
                t: newMockT,
                i18n: {} as ReturnType<typeof useTranslation>['i18n'],
                ready: true,
            } as unknown as ReturnType<typeof useTranslation>);

            rerender();

            expect(result.current.tabItems).not.toBe(firstItems);
        });
    });

    describe('getActiveKey', () => {
        it('should return correct active key for compare path', () => {
            vi.mocked(useLocation).mockReturnValue(
                createMockLocation('/compare'),
            );

            const { result } = renderHook(() => useRepositoryNavigation());
            const activeKey = result.current.getActiveKey();

            expect(activeKey).toBe('compare');
        });

        it('should return correct active key for issues path', () => {
            vi.mocked(useLocation).mockReturnValue(
                createMockLocation('/issues'),
            );

            const { result } = renderHook(() => useRepositoryNavigation());
            const activeKey = result.current.getActiveKey();

            expect(activeKey).toBe('issues');
        });

        it('should return correct active key for projects path', () => {
            vi.mocked(useLocation).mockReturnValue(
                createMockLocation('/projects'),
            );

            const { result } = renderHook(() => useRepositoryNavigation());
            const activeKey = result.current.getActiveKey();

            expect(activeKey).toBe('projects');
        });

        it('should return default key "compare" for unknown path', () => {
            vi.mocked(useLocation).mockReturnValue(
                createMockLocation('/unknown'),
            );

            const { result } = renderHook(() => useRepositoryNavigation());
            const activeKey = result.current.getActiveKey();

            expect(activeKey).toBe('compare');
        });

        it('should update active key when location changes', () => {
            const { result, rerender } = renderHook(() =>
                useRepositoryNavigation(),
            );

            expect(result.current.getActiveKey()).toBe('compare');

            vi.mocked(useLocation).mockReturnValue(
                createMockLocation('/projects'),
            );
            rerender();

            expect(result.current.getActiveKey()).toBe('projects');
        });

        it('should memoize getActiveKey function', () => {
            const { result, rerender } = renderHook(() =>
                useRepositoryNavigation(),
            );
            const firstGetActiveKey = result.current.getActiveKey;

            rerender();

            expect(result.current.getActiveKey).toBe(firstGetActiveKey);
        });

        it('should recreate getActiveKey when location.pathname changes', () => {
            vi.mocked(useLocation).mockReturnValue(
                createMockLocation('/compare'),
            );

            const { result, rerender } = renderHook(() =>
                useRepositoryNavigation(),
            );
            const firstGetActiveKey = result.current.getActiveKey;

            vi.mocked(useLocation).mockReturnValue(
                createMockLocation('/pulls'),
            );
            rerender();

            expect(result.current.getActiveKey).not.toBe(firstGetActiveKey);
        });
    });

    describe('handleTabChange', () => {
        it('should navigate to correct route when valid tab key is provided', () => {
            const { result } = renderHook(() => useRepositoryNavigation());

            act(() => {
                result.current.handleTabChange('projects');
            });

            expect(mockTo).toHaveBeenCalledWith('/projects', {});
        });

        it('should not navigate when invalid tab key is provided', () => {
            const { result } = renderHook(() => useRepositoryNavigation());

            act(() => {
                result.current.handleTabChange('invalid-key');
            });

            expect(mockTo).not.toHaveBeenCalled();
        });

        it('should navigate to compare route', () => {
            const { result } = renderHook(() => useRepositoryNavigation());

            act(() => {
                result.current.handleTabChange('compare');
            });

            expect(mockTo).toHaveBeenCalledWith('/compare', {});
        });

        it('should navigate to issues route', () => {
            const { result } = renderHook(() => useRepositoryNavigation());

            act(() => {
                result.current.handleTabChange('issues');
            });

            expect(mockTo).toHaveBeenCalledWith('/issues', {});
        });

        it('should navigate to projects route', () => {
            const { result } = renderHook(() => useRepositoryNavigation());

            act(() => {
                result.current.handleTabChange('projects');
            });

            expect(mockTo).toHaveBeenCalledWith('/projects', {});
        });

        it('should memoize handleTabChange function', () => {
            const { result, rerender } = renderHook(() =>
                useRepositoryNavigation(),
            );
            const firstHandleTabChange = result.current.handleTabChange;

            rerender();

            expect(result.current.handleTabChange).toBe(firstHandleTabChange);
        });

        it('should recreate handleTabChange when to function changes', () => {
            const { result, rerender } = renderHook(() =>
                useRepositoryNavigation(),
            );
            const firstHandleTabChange = result.current.handleTabChange;

            const newMockTo = vi.fn();
            vi.mocked(Shared.useAppNavigate).mockReturnValue({
                to: newMockTo,
                back: mockBack,
                forward: mockForward,
            });

            rerender();

            expect(result.current.handleTabChange).not.toBe(
                firstHandleTabChange,
            );
        });
    });

    describe('integration', () => {
        it('should work correctly together', () => {
            vi.mocked(useLocation).mockReturnValue(
                createMockLocation('/compare'),
            );

            const { result } = renderHook(() => useRepositoryNavigation());

            expect(result.current.getActiveKey()).toBe('compare');
            expect(result.current.tabItems).toHaveLength(3);

            act(() => {
                result.current.handleTabChange('projects');
            });

            expect(mockTo).toHaveBeenCalledWith('/projects', {});
        });
    });
});
