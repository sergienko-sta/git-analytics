import { Suspense, useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Spin } from 'antd';

import * as Shared from '@shared';

export const AppRouter = () => {
    const router = useMemo(() => Shared.createAppRouter(), []);

    return (
        <Suspense fallback={<Spin fullscreen size='large' />}>
            <RouterProvider router={router} />
        </Suspense>
    );
};
