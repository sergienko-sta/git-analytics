import { Suspense, useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Spin } from 'antd';

import * as Lib from '../lib';

export const AppRouter = () => {
    const router = useMemo(() => Lib.createAppRouter(), []);

    return (
        <Suspense fallback={<Spin fullscreen size='large' />}>
            <RouterProvider router={router} />
        </Suspense>
    );
};
