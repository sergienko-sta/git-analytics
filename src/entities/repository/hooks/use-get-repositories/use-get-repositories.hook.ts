import { useQuery } from '@tanstack/react-query';

import * as Shared from '@shared';

import * as Api from '../../api';
import * as Constants from '../../constants';
import type * as Model from '../../model';

/* v8 ignore start */
export const useSearchRepos = (params: Model.TSearchReposParams) => {
    return useQuery({
        queryKey: Constants.searchReposGuid.search(params),
        queryFn: async () => await Api.repositoryApi.searchRepos(params),
        enabled: params.q.length > Shared.MIN_QUERY_LENGTH,
    });
};
/* v8 ignore stop */
