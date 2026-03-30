/**
 * Извлекает первый сегмент пути из URL-строки с ведущим слэшем.
 *
 * @param {string} pathname - Путь из URL (например, location.pathname)
 * @returns {string} Первый сегмент пути с ведущим слэшем или пустая строка
 *
 * @example
 * getFirstPathSegment('/repository/pagination')   // '/repository'
 * getFirstPathSegment('/profile/facebook')        // '/profile'
 * getFirstPathSegment('/search?q=react')          // '/search'
 * getFirstPathSegment('/settings#profile')        // '/settings'
 * getFirstPathSegment('/')                        // '/'
 * getFirstPathSegment('')                         // ''
 */
export const getFirstPathSegment = (pathname: string): string => {
    if (!pathname) return '';

    if (pathname === '/') return '/';

    const cleanPath = pathname.split('?')[0]?.split('#')[0];
    const match = cleanPath?.match(/^\/[^/]+/);

    return match?.[0] ?? '';
};
