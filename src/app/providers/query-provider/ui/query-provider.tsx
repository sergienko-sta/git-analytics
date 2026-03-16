import { type PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import * as Constants from '../constants';

export const QueryProvider = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider client={Constants.queryClient}>
            {children}
            {import.meta.env.DEV && <ReactQueryDevtools />}
        </QueryClientProvider>
    );
};
