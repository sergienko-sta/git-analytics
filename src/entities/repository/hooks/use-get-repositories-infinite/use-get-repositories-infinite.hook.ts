import { useInfiniteQuery } from '@tanstack/react-query';

import * as Shared from '@shared';

import * as Api from '../../api';
import * as Constants from '../../constants';
import type * as Model from '../../model';

/* v8 ignore start */
export const useSearchReposInfinite = (params: Model.TSearchReposParams) => {
    const { q, sort, order, perPage } = params;
    return useInfiniteQuery({
        queryKey: Constants.searchReposGuid.infiniteSearch(params),
        queryFn: async ({ pageParam = Shared.DEFAULT_PAGE }) => {
            const result = await Api.repositoryApi.searchReposInfinite({
                q,
                sort,
                order,
                page: pageParam,
                perPage,
            });

            return result;
        },

        initialPageParam: Shared.DEFAULT_PAGE,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        enabled: q.length >= Shared.MIN_QUERY_LENGTH,
    });
};
/* v8 ignore stop */
