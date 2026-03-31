import type * as Shared from '@shared';

import type ruWidgets from '../../../../public/locales/ru/widgets.json';
import type { TAB_KEYS } from '../constants';

type WidgetsResource = (typeof ruWidgets)['repository-layout'];
type WidgetsKeys = Shared.Types.NestedKeyOf<WidgetsResource>;

export type TTabKeys = (typeof TAB_KEYS)[keyof typeof TAB_KEYS];

export interface TabConfig {
    key: TTabKeys;
    route: Shared.EAppRoutes;
    translationKey: WidgetsKeys;
    check: (path: string) => boolean;
}
