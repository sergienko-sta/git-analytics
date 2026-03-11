import type { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as Shared from '@shared';

import { useNavigationTabs } from './use-navigation-tabs.hook';

vi.mock('@shared', () => ({
    NAVIGATION_TAB_ITEMS: [
        {
            key: 'home',
            icon: <div data-testid='home-icon'>🏠</div>,
            label: 'tab.home',
        },
        {
            key: 'profile',
            icon: <div data-testid='profile-icon'>👤</div>,
            label: 'tab.repositories',
        },
    ] as Shared.Model.INavigationTabItem[],
    EAppRoutes: {
        HOME: 'home',
        PROFILE: 'profile',
        REPOSITORY: 'repository',
        NOT_FOUND: 'not_found',
    },
}));

vi.mock('./use-navigation-tabs.styles', () => ({
    TabContainer: ({ children }: { children: ReactNode }) => (
        <div data-testid='tab-container'>{children}</div>
    ),
}));

describe('useNavigationTabs', () => {
    const mockOnTabChange = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('✅ should initialize with correct tab items', () => {
        const { result } = renderHook(() =>
            useNavigationTabs({ onTabChange: mockOnTabChange }),
        );

        expect(result.current.tabItems).toBeDefined();
        expect(result.current.tabItems).toHaveLength(2);

        expect(result.current.tabItems[0]?.key).toBe(Shared.EAppRoutes.HOME);
        expect(result.current.tabItems[1]?.key).toBe(Shared.EAppRoutes.PROFILE);

        expect(result.current.tabItems[0]?.label).toBeDefined();
        expect(result.current.tabItems[0]?.label.type).toBeDefined();
    });

    it('✅ should handle tab change correctly', () => {
        const { result } = renderHook(() =>
            useNavigationTabs({ onTabChange: mockOnTabChange }),
        );

        act(() => {
            result.current.handleTabChange(Shared.EAppRoutes.PROFILE);
        });

        expect(mockOnTabChange).toHaveBeenCalledTimes(1);
        expect(mockOnTabChange).toHaveBeenCalledWith(Shared.EAppRoutes.PROFILE);
    });

    it('✅ should handle multiple tab changes', () => {
        const { result } = renderHook(() =>
            useNavigationTabs({ onTabChange: mockOnTabChange }),
        );

        act(() => {
            result.current.handleTabChange(Shared.EAppRoutes.HOME);
        });
        expect(mockOnTabChange).toHaveBeenCalledWith(Shared.EAppRoutes.HOME);

        act(() => {
            result.current.handleTabChange(Shared.EAppRoutes.REPOSITORY);
        });
        expect(mockOnTabChange).toHaveBeenCalledWith(
            Shared.EAppRoutes.REPOSITORY,
        );

        expect(mockOnTabChange).toHaveBeenCalledTimes(2);
    });

    it('✅ should memoize tab items', () => {
        const { result, rerender } = renderHook(() =>
            useNavigationTabs({ onTabChange: mockOnTabChange }),
        );

        const firstTabItems = result.current.tabItems;

        rerender();

        expect(result.current.tabItems).toBe(firstTabItems);
    });

    it('✅ should memoize handleTabChange callback', () => {
        const { result, rerender } = renderHook(() =>
            useNavigationTabs({ onTabChange: mockOnTabChange }),
        );

        const firstHandleTabChange = result.current.handleTabChange;

        rerender();

        expect(result.current.handleTabChange).toBe(firstHandleTabChange);
    });

    it('✅ should recreate handleTabChange when onTabChange changes', () => {
        const { result, rerender } = renderHook(
            ({ onTabChange }) => useNavigationTabs({ onTabChange }),
            {
                initialProps: { onTabChange: mockOnTabChange },
            },
        );

        const firstHandleTabChange = result.current.handleTabChange;

        const newMockOnTabChange = vi.fn();
        rerender({ onTabChange: newMockOnTabChange });

        expect(result.current.handleTabChange).not.toBe(firstHandleTabChange);
    });

    it('✅ should render tab items with correct labels', () => {
        const { result } = renderHook(() =>
            useNavigationTabs({ onTabChange: mockOnTabChange }),
        );

        result.current.tabItems.forEach((item, index) => {
            expect(item.label).toBeDefined();
            expect(item.key).toBe(Shared.NAVIGATION_TAB_ITEMS[index]?.key);
        });
    });

    it('✅ should work with empty tab items', () => {
        vi.mocked(Shared).NAVIGATION_TAB_ITEMS = [];

        const { result } = renderHook(() =>
            useNavigationTabs({ onTabChange: mockOnTabChange }),
        );

        expect(result.current.tabItems).toHaveLength(0);
    });
});
