import { Suspense, useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Spin } from 'antd';

import { RootLayout } from '@app';

import * as Shared from '@shared';

export const AppRouter = () => {
    const router = useMemo(
        () =>
            Shared.createAppRouter({
                rootElement: <RootLayout />,
                children: Shared.routes,
            }),
        [],
    );

    return (
        <Suspense fallback={<Spin fullscreen size='large' />}>
            <RouterProvider router={router} />
        </Suspense>
    );
};
