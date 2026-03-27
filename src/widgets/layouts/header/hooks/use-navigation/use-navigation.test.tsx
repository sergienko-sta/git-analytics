import { useLocation } from 'react-router-dom';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as Shared from '@shared';

import { useNavigation } from './use-navigation.hook';

const { mockNavigationService, mockTo } = vi.hoisted(() => {
    return {
        mockNavigationService: {
            getKeyByPath: vi.fn(),
            getDefaultKey: vi.fn(),
            getItemByKey: vi.fn(),
            isHomeKey: vi.fn(),
        },
        mockTo: vi.fn(),
    };
});

vi.mock(import('react-router-dom'), async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useLocation: vi.fn(),
    };
});

vi.mock('@shared', () => ({
    useAppNavigate: () => ({
        to: mockTo,
    }),
    navigationService: mockNavigationService,
    EAppRoutes: {
        HOME: 'home',
        PROFILE: 'profile',
        REPOSITORY: 'repository',
        NOT_FOUND: 'not_found',
    },
}));

const mockUseLocation = useLocation as unknown as ReturnType<typeof vi.fn>;

describe('useNavigation', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mockNavigationService.getDefaultKey.mockReturnValue(
            Shared.EAppRoutes.HOME,
        );
        mockNavigationService.getKeyByPath.mockReturnValue(
            Shared.EAppRoutes.HOME,
        );
        mockNavigationService.getItemByKey.mockImplementation(
            (key: Shared.EAppRoutes) => ({
                key,
                path: `/${key}`,
                label: `Page ${key}`,
            }),
        );
        mockNavigationService.isHomeKey.mockImplementation(
            (key) => key === Shared.EAppRoutes.HOME,
        );

        mockUseLocation.mockReturnValue({
            pathname: '/',
            search: '',
            hash: '',
            state: null,
            key: 'default',
        });
    });

    it('should initialize with HOME as active tab', () => {
        mockNavigationService.getKeyByPath.mockReturnValueOnce(
            Shared.EAppRoutes.HOME,
        );

        const { result } = renderHook(() => useNavigation());

        expect(result.current.activeTab).toBe(Shared.EAppRoutes.HOME);
        expect(mockNavigationService.getKeyByPath).toHaveBeenCalledWith('/');
        expect(mockNavigationService.getDefaultKey).not.toHaveBeenCalled();
    });

    it('should use default key when path not found', () => {
        mockNavigationService.getKeyByPath.mockReturnValueOnce(undefined);

        const { result } = renderHook(() => useNavigation());

        expect(mockNavigationService.getKeyByPath).toHaveBeenCalledWith('/');
        expect(mockNavigationService.getDefaultKey).toHaveBeenCalled();
        expect(result.current.activeTab).toBe(Shared.EAppRoutes.HOME);
    });

    it('should handle logo click correctly when on home', () => {
        mockNavigationService.isHomeKey.mockReturnValue(true);

        const { result } = renderHook(() => useNavigation());

        act(() => {
            result.current.handleLogoClick();
        });

        expect(mockNavigationService.isHomeKey).toHaveBeenCalledWith(
            Shared.EAppRoutes.HOME,
        );
        expect(mockTo).not.toHaveBeenCalled();
    });

    it('should handle logo click correctly if active tab is not Home', () => {
        // Сначала устанавливаем активный таб не HOME
        mockNavigationService.getKeyByPath.mockReturnValue(
            Shared.EAppRoutes.PROFILE,
        );
        mockNavigationService.isHomeKey.mockImplementation(
            (key) => key === Shared.EAppRoutes.HOME,
        );

        const { result } = renderHook(() => useNavigation());

        act(() => {
            result.current.handleLogoClick();
        });

        expect(mockNavigationService.isHomeKey).toHaveBeenCalledWith(
            Shared.EAppRoutes.PROFILE,
        );
        expect(mockTo).toHaveBeenCalledWith(Shared.EAppRoutes.HOME, {});
    });

    it('should handle tab change correctly', () => {
        const { result } = renderHook(() => useNavigation());

        act(() => {
            result.current.handleTabChange(Shared.EAppRoutes.PROFILE);
        });

        expect(mockNavigationService.getItemByKey).toHaveBeenCalledWith(
            Shared.EAppRoutes.PROFILE,
        );
        expect(mockTo).toHaveBeenCalledTimes(1);
        expect(mockTo).toHaveBeenCalledWith(Shared.EAppRoutes.PROFILE, {});
        expect(result.current.activeTab).toBe(Shared.EAppRoutes.PROFILE);
    });

    it('should skip navigation and state update when changing to the same tab', () => {
        const { result } = renderHook(() => useNavigation());

        vi.clearAllMocks();

        act(() => {
            result.current.handleTabChange(Shared.EAppRoutes.HOME);
        });

        expect(mockNavigationService.getItemByKey).toHaveBeenCalledWith(
            Shared.EAppRoutes.HOME,
        );
        expect(mockTo).not.toHaveBeenCalled();
        expect(result.current.activeTab).toBe(Shared.EAppRoutes.HOME);
    });

    it('should handle multiple tab changes', () => {
        const { result } = renderHook(() => useNavigation());

        act(() => {
            result.current.handleTabChange(Shared.EAppRoutes.PROFILE);
        });
        expect(result.current.activeTab).toBe(Shared.EAppRoutes.PROFILE);
        expect(mockTo).toHaveBeenNthCalledWith(
            1,
            Shared.EAppRoutes.PROFILE,
            {},
        );

        act(() => {
            result.current.handleTabChange(Shared.EAppRoutes.REPOSITORY);
        });
        expect(result.current.activeTab).toBe(Shared.EAppRoutes.REPOSITORY);
        expect(mockTo).toHaveBeenNthCalledWith(
            2,
            Shared.EAppRoutes.REPOSITORY,
            {},
        );

        expect(mockTo).toHaveBeenCalledTimes(2);
    });

    it('should update active tab when location changes', () => {
        const { result, rerender } = renderHook(() => useNavigation());

        // Меняем location
        mockUseLocation.mockReturnValue({
            pathname: '/profile',
            search: '',
            hash: '',
            state: null,
            key: 'profile',
        });

        mockNavigationService.getKeyByPath.mockReturnValue(
            Shared.EAppRoutes.PROFILE,
        );

        // Ререндерим хук
        rerender();

        expect(mockNavigationService.getKeyByPath).toHaveBeenCalledWith(
            '/profile',
        );
        expect(result.current.activeTab).toBe(Shared.EAppRoutes.PROFILE);
    });

    it('should not update active tab when location change returns no key', () => {
        const { result, rerender } = renderHook(() => useNavigation());
        const currentTab = result.current.activeTab;
        mockUseLocation.mockReturnValue({
            pathname: '/unknown',
            search: '',
            hash: '',
            state: null,
            key: 'unknown',
        });
        mockNavigationService.getKeyByPath.mockReturnValue(undefined);

        rerender();

        expect(mockNavigationService.getKeyByPath).toHaveBeenCalledWith(
            '/unknown',
        );
        expect(result.current.activeTab).toBe(currentTab);
    });

    it('should memoize callbacks', () => {
        const { result, rerender } = renderHook(() => useNavigation());

        const firstHandleLogoClick = result.current.handleLogoClick;
        const firstHandleTabChange = result.current.handleTabChange;

        rerender();

        expect(result.current.handleLogoClick).toBe(firstHandleLogoClick);
        expect(result.current.handleTabChange).toBe(firstHandleTabChange);
    });

    it('should handle tab change with invalid key', () => {
        mockNavigationService.getItemByKey.mockReturnValue(undefined);

        const { result } = renderHook(() => useNavigation());
        const currentTab = result.current.activeTab;

        act(() => {
            result.current.handleTabChange('invalid-key' as Shared.EAppRoutes);
        });

        expect(mockNavigationService.getItemByKey).toHaveBeenCalledWith(
            'invalid-key',
        );
        expect(mockTo).not.toHaveBeenCalled();
        expect(result.current.activeTab).toBe(currentTab);
    });

    it('should handle location change to same path', () => {
        const { result, rerender } = renderHook(() => useNavigation());
        const currentTab = result.current.activeTab;
        vi.clearAllMocks();

        mockUseLocation.mockReturnValue({
            pathname: '/',
            search: '',
            hash: '',
            state: null,
            key: 'home',
        });

        mockNavigationService.getKeyByPath.mockReturnValue(
            Shared.EAppRoutes.HOME,
        );

        rerender();

        expect(result.current.activeTab).toBe(currentTab);
    });
});
