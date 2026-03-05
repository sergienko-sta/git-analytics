import { Outlet, RouterProvider } from 'react-router-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createAppRouter } from './create-app-router.lib';

vi.mock('../config', () => ({
    routes: [
        {
            path: '/test',
            element: <div data-testid='test-page'>Test Page</div>,
        },
        {
            path: '/about',
            element: <div data-testid='about-page'>About Page</div>,
        },
    ],
}));

vi.mock('../constants', () => ({
    AppRoutes: {
        HOME: 'home',
    },
    routePaths: {
        home: '/',
    },
}));

vi.mock('@widgets', () => ({
    RootLayout: () => {
        const MockRootLayout = () => (
            <div data-testid='root-layout'>
                Root Layout
                <div data-testid='outlet-container'>
                    <Outlet />
                </div>
            </div>
        );
        MockRootLayout.displayName = 'RootLayout';
        return <MockRootLayout />;
    },
}));

describe('createAppRouter', () => {
    it('should render outlet content when navigating', async () => {
        const router = createAppRouter();

        render(<RouterProvider router={router} />);

        expect(screen.getByTestId('root-layout')).toBeInTheDocument();
        expect(screen.queryByTestId('test-page')).not.toBeInTheDocument();

        await act(async () => {
            await router.navigate('/test');
        });

        await waitFor(() => {
            expect(screen.getByTestId('test-page')).toBeInTheDocument();
        });

        const outletContainer = screen.getByTestId('outlet-container');
        expect(outletContainer).toContainElement(
            screen.getByTestId('test-page'),
        );

        await act(async () => {
            await router.navigate('/about');
        });

        await waitFor(() => {
            expect(screen.getByTestId('about-page')).toBeInTheDocument();
        });
    });
});
