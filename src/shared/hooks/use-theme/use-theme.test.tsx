import type { ReactNode } from 'react';
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { EThemeMode } from '@/shared/model';

import { useTheme } from './use-theme.hook';
import { type IThemeContextType, ThemeContext } from './use-theme.types';

describe('useTheme', () => {
    const mockToggle = vi.fn();

    const mockContextValue: IThemeContextType = {
        mode: EThemeMode.LIGHT,
        toggleTheme: mockToggle,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('✅ should return context value when used within ThemeProvider', () => {
        const wrapper = ({ children }: { children: ReactNode }) => (
            <ThemeContext.Provider value={mockContextValue}>
                {children}
            </ThemeContext.Provider>
        );

        const { result } = renderHook(() => useTheme(), { wrapper });

        expect(result.current).toBeDefined();
        expect(result.current.mode).toBe(EThemeMode.LIGHT);
        expect(result.current.toggleTheme).toBe(mockToggle);
    });

    it('✅ should work with custom render function', () => {
        const { result } = renderHook(() => useTheme(), {
            wrapper: ({ children }) => (
                <ThemeContext.Provider value={mockContextValue}>
                    {children}
                </ThemeContext.Provider>
            ),
        });

        expect(result.current.mode).toBe(EThemeMode.LIGHT);
    });

    it('❌ should throw error when used outside ThemeProvider', () => {
        expect(() => {
            renderHook(() => useTheme());
        }).toThrow('useTheme must be used within ThemeProvider');
    });

    it('✅ should work with different theme modes', () => {
        const darkContext: IThemeContextType = {
            mode: EThemeMode.DARK,
            toggleTheme: mockToggle,
        };

        const wrapper = ({ children }: { children: ReactNode }) => (
            <ThemeContext.Provider value={darkContext}>
                {children}
            </ThemeContext.Provider>
        );

        const { result } = renderHook(() => useTheme(), { wrapper });

        expect(result.current.mode).toBe(EThemeMode.DARK);
    });
});
