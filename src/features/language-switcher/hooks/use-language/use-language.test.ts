import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useLanguage } from './use-language.hook';

const mockChangeLanguage = vi.fn();

const mockI18n = {
    language: 'ru',
    changeLanguage: mockChangeLanguage,
};

mockChangeLanguage.mockResolvedValue(undefined);

mockChangeLanguage.mockImplementation((lang: string) => {
    mockI18n.language = lang as 'ru' | 'en';
    return Promise.resolve();
});

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        i18n: mockI18n,
    }),
}));

vi.mock('@shared', () => ({
    Model: {
        SupportedLanguage: ['en', 'ru'],
    },
    PREFERRED_LANGUAGE: 'preferredLanguage',
    defaultLanguage: 'ru',
}));

describe('useLanguage', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mockI18n.language = 'ru';

        mockChangeLanguage.mockImplementation((lang: string) => {
            mockI18n.language = lang as 'ru' | 'en';
            return Promise.resolve();
        });
    });

    describe('initialization', () => {
        it('should return current language from i18n', () => {
            const { result } = renderHook(() => useLanguage());

            expect(result.current.currentLanguage).toBe('ru');
        });

        it('should handle different initial languages', () => {
            mockI18n.language = 'en';
            const { result } = renderHook(() => useLanguage());

            expect(result.current.currentLanguage).toBe('en');
        });

        it('should have stable references between renders', () => {
            const { result, rerender } = renderHook(() => useLanguage());

            const firstChangeLanguage = result.current.changeLanguage;
            const firstIsLanguageActive = result.current.isLanguageActive;

            rerender();

            expect(result.current.changeLanguage).toBe(firstChangeLanguage);
            expect(result.current.isLanguageActive).toBe(firstIsLanguageActive);
        });
    });

    describe('changeLanguage', () => {
        it('should call i18n.changeLanguage with correct parameter', () => {
            const { result } = renderHook(() => useLanguage());

            act(() => {
                result.current.changeLanguage('en');
            });

            expect(mockChangeLanguage).toHaveBeenCalledWith('en');
            expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
        });

        it('should save selected language to localStorage', () => {
            const { result } = renderHook(() => useLanguage());

            act(() => {
                result.current.changeLanguage('en');
            });

            expect(window.localStorage.getItem('preferredLanguage')).toBe('en');
        });

        it('should handle multiple language changes', () => {
            const { result } = renderHook(() => useLanguage());

            act(() => {
                result.current.changeLanguage('en');
            });
            expect(window.localStorage.getItem('preferredLanguage')).toBe('en');

            act(() => {
                result.current.changeLanguage('ru');
            });
            expect(window.localStorage.getItem('preferredLanguage')).toBe('ru');

            expect(mockChangeLanguage).toHaveBeenCalledTimes(2);
        });

        it('should handle same language change gracefully', () => {
            const { result } = renderHook(() => useLanguage());

            act(() => {
                result.current.changeLanguage('ru');
            });

            expect(mockChangeLanguage).toHaveBeenCalledWith('ru');
            expect(window.localStorage.getItem('preferredLanguage')).toBe('ru');
        });

        it('should handle i18n.changeLanguage error', () => {
            mockChangeLanguage.mockRejectedValueOnce(
                new Error('Network error'),
            );

            const { result } = renderHook(() => useLanguage());

            act(() => {
                result.current.changeLanguage('en');
            });

            return waitFor(() => {
                expect(mockChangeLanguage).toHaveBeenCalledWith('en');
                expect(window.localStorage.getItem('preferredLanguage')).toBe(
                    'ru',
                );
            });
        });

        it('should preserve language selection after error', () => {
            mockChangeLanguage
                .mockRejectedValueOnce(new Error('Network error'))
                .mockResolvedValueOnce(undefined);

            const { result } = renderHook(() => useLanguage());

            act(() => {
                result.current.changeLanguage('en');
            });

            return waitFor(() => {
                expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
                expect(mockChangeLanguage).toHaveBeenCalledWith('en');
                expect(window.localStorage.getItem('preferredLanguage')).toBe(
                    'ru',
                );
            }).then(() => {
                act(() => {
                    result.current.changeLanguage('en');
                });

                return waitFor(() => {
                    expect(mockChangeLanguage).toHaveBeenCalledTimes(2);
                    expect(mockChangeLanguage).toHaveBeenNthCalledWith(2, 'en');
                    expect(
                        window.localStorage.getItem('preferredLanguage'),
                    ).toBe('en');
                });
            });
        });
    });

    describe('isLanguageActive', () => {
        it('should return true for active language', () => {
            const { result } = renderHook(() => useLanguage());

            expect(result.current.isLanguageActive('ru')).toBe(true);
            expect(result.current.isLanguageActive('en')).toBe(false);
        });

        it('should update when language changes', () => {
            const { result, rerender } = renderHook(() => useLanguage());

            expect(result.current.isLanguageActive('ru')).toBe(true);
            expect(result.current.isLanguageActive('en')).toBe(false);

            act(() => {
                result.current.changeLanguage('en');
            });

            rerender();

            expect(result.current.currentLanguage).toBe('en');
            expect(result.current.isLanguageActive('en')).toBe(true);
            expect(result.current.isLanguageActive('ru')).toBe(false);
        });

        it('should handle all supported languages', () => {
            const { result } = renderHook(() => useLanguage());

            expect(result.current.isLanguageActive('en')).toBe(false);
            expect(result.current.isLanguageActive('ru')).toBe(true);
        });
    });

    describe('integration with localStorage', () => {
        it('should save language to localStorage', () => {
            const { result } = renderHook(() => useLanguage());

            act(() => {
                result.current.changeLanguage('en');
            });

            return waitFor(() => {
                expect(window.localStorage.getItem('preferredLanguage')).toBe(
                    'en',
                );
            });
        });

        it('should update localStorage on multiple changes', () => {
            const { result } = renderHook(() => useLanguage());

            act(() => {
                result.current.changeLanguage('en');
            });

            return waitFor(() => {
                expect(window.localStorage.getItem('preferredLanguage')).toBe(
                    'en',
                );
            }).then(() => {
                act(() => {
                    result.current.changeLanguage('ru');
                });

                return waitFor(() => {
                    expect(
                        window.localStorage.getItem('preferredLanguage'),
                    ).toBe('ru');
                });
            });
        });

        it('should have correct length after changes', () => {
            const { result } = renderHook(() => useLanguage());

            expect(window.localStorage.length).toBe(0);

            act(() => {
                result.current.changeLanguage('en');
            });

            return waitFor(() => {
                expect(window.localStorage.length).toBe(1);
                expect(window.localStorage.key(0)).toBe('preferredLanguage');
            });
        });
    });

    describe('edge cases', () => {
        it('should handle changeLanguage with unsupported language', () => {
            const { result } = renderHook(() => useLanguage());

            act(() => {
                // @ts-expect-error - тест рантайм поведение с неподдерживаемым языком
                result.current.changeLanguage('fr');
            });

            return waitFor(() => {
                expect(mockChangeLanguage).toHaveBeenCalledWith('fr');
                expect(window.localStorage.getItem('preferredLanguage')).toBe(
                    'fr',
                );
            });
        });

        it('should handle rapid language changes', () => {
            const { result } = renderHook(() => useLanguage());

            act(() => {
                result.current.changeLanguage('en');
                result.current.changeLanguage('ru');
                result.current.changeLanguage('en');
            });

            return waitFor(() => {
                expect(mockChangeLanguage).toHaveBeenCalledTimes(3);
                expect(window.localStorage.getItem('preferredLanguage')).toBe(
                    'en',
                );
            });
        });
    });
});
