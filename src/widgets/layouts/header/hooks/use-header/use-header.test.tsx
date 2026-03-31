import { useTranslation } from 'react-i18next';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as Shared from '@shared';

import { useHeader } from './use-header.hook';

vi.mock('react-i18next', () => ({
    useTranslation: vi.fn(),
}));

vi.mock('@shared', () => ({
    useTheme: vi.fn(),
    Model: {
        EThemeMode: {
            LIGHT: 'light',
            DARK: 'dark',
        },
    },
}));

vi.mock('@ant-design/icons', () => ({
    BulbFilled: () => <div data-testid='bulb-filled' />,
    BulbOutlined: () => <div data-testid='bulb-outlined' />,
}));

describe('useHeader', () => {
    const mockT = vi.fn();
    const mockToggleTheme = vi.fn();

    const setupMockTranslation = (key: string) => {
        mockT.mockImplementation((inputKey: string) => {
            if (inputKey === key) return key;
            return inputKey;
        });
    };

    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(useTranslation).mockReturnValue({
            t: mockT,
            i18n: {} as ReturnType<typeof useTranslation>['i18n'],
            ready: true,
        } as unknown as ReturnType<typeof useTranslation>);
    });

    describe('light theme', () => {
        beforeEach(() => {
            vi.mocked(Shared.useTheme).mockReturnValue({
                mode: Shared.Model.EThemeMode.LIGHT,
                toggleTheme: mockToggleTheme,
            } as unknown as ReturnType<typeof Shared.useTheme>);
            setupMockTranslation('layout-header.switch-to-dark');
        });

        it('should configure themeButtonConfig for light theme', () => {
            const { result } = renderHook(() => useHeader());

            expect(result.current.themeButtonConfig).toMatchObject({
                title: 'layout-header.switch-to-dark',
                tooltip: 'layout-header.switch-to-dark',
            });
            expect(result.current.isLightTheme).toBe(true);
        });
    });

    describe('dark theme', () => {
        beforeEach(() => {
            vi.mocked(Shared.useTheme).mockReturnValue({
                mode: Shared.Model.EThemeMode.DARK,
                toggleTheme: mockToggleTheme,
            } as unknown as ReturnType<typeof Shared.useTheme>);
            setupMockTranslation('layout-header.switch-to-light');
        });

        it('should configure themeButtonConfig for dark theme', () => {
            const { result } = renderHook(() => useHeader());

            expect(result.current.themeButtonConfig).toMatchObject({
                title: 'layout-header.switch-to-light',
                tooltip: 'layout-header.switch-to-light',
            });
            expect(result.current.isLightTheme).toBe(false);
        });
    });

    describe('theme toggle', () => {
        beforeEach(() => {
            vi.mocked(Shared.useTheme).mockReturnValue({
                mode: Shared.Model.EThemeMode.LIGHT,
                toggleTheme: mockToggleTheme,
            } as unknown as ReturnType<typeof Shared.useTheme>);
        });

        it('should call toggleTheme when handleThemeToggle is invoked', () => {
            const { result } = renderHook(() => useHeader());

            act(() => {
                result.current.handleThemeToggle();
            });

            expect(mockToggleTheme).toHaveBeenCalledTimes(1);
        });
    });

    describe('memoization behavior', () => {
        beforeEach(() => {
            vi.mocked(Shared.useTheme).mockReturnValue({
                mode: Shared.Model.EThemeMode.LIGHT,
                toggleTheme: mockToggleTheme,
            } as unknown as ReturnType<typeof Shared.useTheme>);
        });

        it('should maintain reference stability for themeButtonConfig', () => {
            const { result, rerender } = renderHook(() => useHeader());
            const firstRenderConfig = result.current.themeButtonConfig;

            rerender();

            expect(result.current.themeButtonConfig).toBe(firstRenderConfig);
        });

        it('should maintain reference stability for handleThemeToggle', () => {
            const { result, rerender } = renderHook(() => useHeader());
            const firstRenderHandler = result.current.handleThemeToggle;

            rerender();

            expect(result.current.handleThemeToggle).toBe(firstRenderHandler);
        });
    });
});
