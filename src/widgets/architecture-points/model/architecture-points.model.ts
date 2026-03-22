import type { ReactNode } from 'react';

export type TArchitectureKey =
    | 'react'
    | 'typescript'
    | 'router'
    | 'fsd'
    | 'api-client'
    | 'performance'
    | 'design-system'
    | 'i18n';

export interface IArchitecturePoint {
    id: number;
    key: TArchitectureKey;
    icon: ReactNode;
}
