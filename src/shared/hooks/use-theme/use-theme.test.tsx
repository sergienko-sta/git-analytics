import type { ReactNode } from 'react';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { EThemeMode } from '@/shared/model';

import { useTheme } from './use-theme.hook';
import { type IThemeContextType, ThemeContext } from './use-theme.types';

const mockContextValue: IThemeContextType = {
    mode: EThemeMode.LIGHT,
    toggleTheme: vi.fn(),
};

const createWrapper = (contextValue: IThemeContextType | undefined) => {
    return function Wrapper({ children }: { children: ReactNode }) {
        return (
            <ThemeContext.Provider value={contextValue}>
                {children}
            </ThemeContext.Provider>
        );
    };
};

describe('useTheme', () => {
    it('should return context value when used within ThemeProvider', () => {
        const wrapper = createWrapper(mockContextValue);

        const { result } = renderHook(() => useTheme(), { wrapper });

        expect(result.current).toBe(mockContextValue);
        expect(result.current.mode).toBe(EThemeMode.LIGHT);
        expect(result.current.toggleTheme).toBeDefined();
    });

    it('should throw error when used outside ThemeProvider', () => {
        const wrapper = createWrapper(undefined);

        expect(() => {
            renderHook(() => useTheme(), { wrapper });
        }).toThrow('useTheme must be used within ThemeProvider');
    });

    it('should throw error with correct message', () => {
        const wrapper = createWrapper(undefined);

        let error: Error | null = null;
        try {
            renderHook(() => useTheme(), { wrapper });
        } catch (e) {
            error = e as Error;
        }

        expect(error).toBeInstanceOf(Error);
        expect(error?.message).toBe(
            'useTheme must be used within ThemeProvider',
        );
    });
});
