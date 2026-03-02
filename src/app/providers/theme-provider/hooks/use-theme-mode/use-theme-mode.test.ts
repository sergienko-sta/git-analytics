import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as Shared from '@shared';

import { useThemeMode } from './use-theme-mode.hook';

describe('useThemeMode', () => {
    beforeEach(() => {
        window.localStorage.clear();
        vi.clearAllMocks();
    });

    it('✅ should initialize with light mode when localStorage is empty', () => {
        const { result } = renderHook(() => useThemeMode());

        expect(result.current.mode).toBe(Shared.Model.EThemeMode.LIGHT);
        expect(result.current.currentTheme).toBeDefined();
        expect(localStorage.getItem('theme-mode')).toBeNull();
    });

    it('✅ should initialize with saved mode from localStorage', () => {
        localStorage.setItem('theme-mode', Shared.Model.EThemeMode.DARK);

        const { result } = renderHook(() => useThemeMode());

        expect(result.current.mode).toBe(Shared.Model.EThemeMode.DARK);
        expect(result.current.currentTheme).toBeDefined();
    });

    it('✅ should toggle theme mode from light to dark', () => {
        const { result } = renderHook(() => useThemeMode());

        expect(result.current.mode).toBe(Shared.Model.EThemeMode.LIGHT);

        act(() => {
            result.current.toggleThemeMode();
        });

        expect(result.current.mode).toBe(Shared.Model.EThemeMode.DARK);
        expect(localStorage.getItem('theme-mode')).toBe(
            Shared.Model.EThemeMode.DARK,
        );
    });

    it('✅ should toggle theme mode from dark to light', () => {
        localStorage.setItem('theme-mode', Shared.Model.EThemeMode.DARK);

        const { result } = renderHook(() => useThemeMode());

        expect(result.current.mode).toBe(Shared.Model.EThemeMode.DARK);

        act(() => {
            result.current.toggleThemeMode();
        });

        expect(result.current.mode).toBe(Shared.Model.EThemeMode.LIGHT);
        expect(localStorage.getItem('theme-mode')).toBe(
            Shared.Model.EThemeMode.LIGHT,
        );
    });

    it('✅ should preserve theme mode through multiple toggles', () => {
        const { result } = renderHook(() => useThemeMode());

        expect(result.current.mode).toBe(Shared.Model.EThemeMode.LIGHT);

        act(() => result.current.toggleThemeMode());
        expect(result.current.mode).toBe(Shared.Model.EThemeMode.DARK);
        expect(localStorage.getItem('theme-mode')).toBe(
            Shared.Model.EThemeMode.DARK,
        );

        act(() => result.current.toggleThemeMode());
        expect(result.current.mode).toBe(Shared.Model.EThemeMode.LIGHT);
        expect(localStorage.getItem('theme-mode')).toBe(
            Shared.Model.EThemeMode.LIGHT,
        );

        act(() => result.current.toggleThemeMode());
        expect(result.current.mode).toBe(Shared.Model.EThemeMode.DARK);
        expect(localStorage.getItem('theme-mode')).toBe(
            Shared.Model.EThemeMode.DARK,
        );
    });

    it('✅ should return stable references for functions and themes', () => {
        const { result, rerender } = renderHook(() => useThemeMode());

        const firstToggle = result.current.toggleThemeMode;
        const firstTheme = result.current.currentTheme;
        const firstMode = result.current.mode;

        rerender();

        expect(result.current.toggleThemeMode).toBe(firstToggle);
        expect(result.current.currentTheme).toBe(firstTheme);
        expect(result.current.mode).toBe(firstMode);
    });

    it('✅ should handle invalid localStorage values', () => {
        localStorage.setItem('theme-mode', 'invalid-mode');

        const { result } = renderHook(() => useThemeMode());

        expect(result.current.mode).toBe(Shared.Model.EThemeMode.LIGHT);
    });
});
