import { CodeOutlined, HomeOutlined } from '@ant-design/icons';

import type * as Model from '../model';

import { EAppRoutes, routePaths } from './routes-path.constants';

export const NAVIGATION_TAB_ITEMS: Model.INavigationTabItem[] = [
    {
        key: EAppRoutes.HOME,
        icon: <HomeOutlined />,
        label: 'tab.home',
        path: routePaths[EAppRoutes.HOME],
        requiresAuth: false,
    },
    {
        key: EAppRoutes.REPOSITORY,
        icon: <CodeOutlined />,
        label: 'tab.repositories',
        path: routePaths[EAppRoutes.REPOSITORY],
        requiresAuth: false,
    },
];
