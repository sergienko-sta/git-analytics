import * as Shared from '@shared';

export const HomePage = Shared.lazyLoad(() => import('@pages/home'), {
    componentName: 'HomePage',
    enabled: import.meta.env.DEV,
});

export const RepositoryPage = Shared.lazyLoad(() => import('@/pages/repository-page'), {
    componentName: 'RepositoryPage',
    enabled: import.meta.env.DEV,
});

export const RepositoryPaginationPage = Shared.lazyLoad(
    () => import('@/pages/repository-pagination-page'),
    {
        componentName: 'RepositoryPaginationPage',
        enabled: import.meta.env.DEV,
    },
);

export const RepositoryInfinitePage = Shared.lazyLoad(
    () => import('@/pages/repository-infinite-page'),
    {
        componentName: 'RepositoryInfinitePage',
        enabled: import.meta.env.DEV,
    },
);
