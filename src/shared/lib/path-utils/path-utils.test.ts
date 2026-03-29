import { describe, expect, it } from 'vitest';

import { getFirstPathSegment } from '../path-utils';

describe('getFirstPathSegment', () => {
    describe('standard paths', () => {
        it('extracts first segment from nested path', () => {
            expect(getFirstPathSegment('/repository/pagination')).toBe(
                '/repository',
            );
        });

        it('returns whole path for single segment', () => {
            expect(getFirstPathSegment('/repository')).toBe('/repository');
        });

        it('returns empty string for root path', () => {
            expect(getFirstPathSegment('/')).toBe('/');
        });
    });

    describe('paths with special characters', () => {
        it('handles query parameters', () => {
            expect(getFirstPathSegment('/search?q=react')).toBe('/search');
        });

        it('handles hash fragments', () => {
            expect(getFirstPathSegment('/settings#profile')).toBe('/settings');
        });

        it('handles trailing slashes', () => {
            expect(getFirstPathSegment('/repositories/')).toBe('/repositories');
        });

        it('handles special characters in segments', () => {
            expect(getFirstPathSegment('/user-profile/123')).toBe(
                '/user-profile',
            );
        });
    });

    describe('edge cases', () => {
        it('returns empty string for empty string', () => {
            expect(getFirstPathSegment('')).toBe('');
        });

        it('handles multiple leading slashes', () => {
            expect(getFirstPathSegment('/repository/pagination')).toBe(
                '/repository',
            );
        });

        it('should return "/" for root path with hash', () => {
            expect(getFirstPathSegment('/#section')).toBe('');
        });

        it('is case-sensitive', () => {
            expect(getFirstPathSegment('/Repository/Profile')).toBe(
                '/Repository',
            );
            expect(getFirstPathSegment('/repository/profile')).toBe(
                '/repository',
            );
        });
    });
});
