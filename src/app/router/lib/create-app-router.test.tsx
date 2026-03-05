import { type RouteObject, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createAppRouter } from './create-app-router.lib';

vi.mock('../config', () => ({
    routes: [
        {
            path: '/test',
            element: <div>Test Page</div>,
        },
        {
            path: '/about',
            element: <div>About Page</div>,
        },
    ] as RouteObject[],
}));

vi.mock('../ui', () => ({
    RootLayout: () => <div data-testid='root-layout'>Root Layout</div>,
}));

describe('createAppRouter', () => {
    it('✅ should create a browser router with correct configuration', () => {
        const router = createAppRouter();

        expect(router).toBeDefined();
        expect(router.routes).toHaveLength(1);
        expect(router.routes[0]?.path).toBe('/');
    });

    it('✅ should include routes from config as children', () => {
        const router = createAppRouter();
        const children = router.routes[0]?.children as RouteObject[];

        expect(children).toHaveLength(2);

        children.forEach((route, index) => {
            expect(route.index).not.toBe(true);

            if ('path' in route) {
                if (index === 0) expect(route.path).toBe('/test');
                if (index === 1) expect(route.path).toBe('/about');
            }

            if ('element' in route) {
                expect(route.element).toBeDefined();
            }
        });
    });

    it('✅ should render routes correctly', () => {
        const router = createAppRouter();

        render(<RouterProvider router={router} />);

        expect(screen.getByTestId('root-layout')).toBeInTheDocument();
    });
});
