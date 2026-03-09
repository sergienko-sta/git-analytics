import { EAppRoutes, NAVIGATION_TAB_ITEMS } from '../../constants';
import type { INavigationTabItem } from '../../model';

/**
 * Сервис для работы с навигацией
 */
export const navigationService = {
    /**
     * Получить пункт навигации по ключу
     */
    getItemByKey: (key: EAppRoutes): INavigationTabItem | undefined =>
        NAVIGATION_TAB_ITEMS.find((item) => item.key === key),

    /**
     * Получить ключ по пути
     */
    getKeyByPath: (path: string): EAppRoutes | undefined =>
        NAVIGATION_TAB_ITEMS.find((item) => item.path === path)?.key,

    /**
     * Проверить, является ли ключ домашним
     */
    isHomeKey: (key: EAppRoutes): boolean => key === EAppRoutes.HOME,

    /**
     * Получить ключ по умолчанию
     */
    getDefaultKey: (): EAppRoutes => EAppRoutes.HOME,
} as const;
